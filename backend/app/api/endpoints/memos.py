import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.memo import Memo, MemoMedia, MemoTag, VisibilityEnum
from app.models.tag import Tag
from app.schemas.memo import MemoUpdate, MemoResponse
from app.api.endpoints.auth import get_current_user
from app.models.user import User

router = APIRouter()

UPLOAD_DIR = "uploads/memos"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ── helper — save uploaded file ──────────────────────────────────
async def save_file(file: UploadFile) -> tuple[str, str]:
    ext        = file.filename.split(".")[-1].lower()
    media_type = "video" if ext in ["mp4", "mov", "avi"] else "image"
    filename   = f"{uuid.uuid4()}.{ext}"
    path       = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as f:
        f.write(await file.read())
    return f"/{path}", media_type


# ── CREATE memo ──────────────────────────────────────────────────
@router.post("/", response_model=MemoResponse)
async def create_memo(
    place_name  : str            = Form(...),
    place_id    : Optional[int]  = Form(None),
    description : Optional[str]  = Form(None),
    visibility  : VisibilityEnum = Form(VisibilityEnum.private),
    tag_ids     : str            = Form(...),
    db          : Session        = Depends(get_db),
    current_user: User           = Depends(get_current_user),
):
    # ── validate tags ────────────────────────────────────────────
    tag_id_list = [int(t.strip()) for t in tag_ids.split(",") if t.strip()]
    if not tag_id_list:
        raise HTTPException(
            status_code=422,
            detail="At least one tag is required"
        )

    # ── validate place_id if provided ────────────────────────────
    if place_id is not None:
        from app.models.place import Place
        place = db.query(Place).filter(Place.id == place_id).first()
        if not place:
            raise HTTPException(
                status_code=404,
                detail=f"Place with id {place_id} not found"
            )

    # ── create memo ──────────────────────────────────────────────
    memo = Memo(
        user_id     = current_user.id,
        place_name  = place_name,
        place_id    = place_id,
        description = description,
        visibility  = visibility,
    )
    db.add(memo)
    db.flush()

    # ── attach tags ──────────────────────────────────────────────
    valid_tags = 0
    for tag_id in tag_id_list:
        tag = db.query(Tag).filter(Tag.id == tag_id).first()
        if tag:
            db.add(MemoTag(memo_id=memo.id, tag_id=tag.id))
            valid_tags += 1

    if valid_tags == 0:
        db.rollback()
        raise HTTPException(
            status_code=422,
            detail="No valid tags found. Please provide valid tag IDs."
        )

    db.commit()
    db.refresh(memo)
    return memo


# ── GET my memos ─────────────────────────────────────────────────
@router.get("/my", response_model=List[MemoResponse])
def get_my_memos(
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    return (
        db.query(Memo)
        .filter(Memo.user_id == current_user.id)
        .order_by(Memo.created_at.desc())
        .all()
    )


# ── GET public memos ──────────────────────────────────────────────
@router.get("/public", response_model=List[MemoResponse])
def get_public_memos(
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    return (
        db.query(Memo)
        .filter(Memo.visibility == VisibilityEnum.public)
        .order_by(Memo.created_at.desc())
        .all()
    )


# ── GET single memo ──────────────────────────────────────────────
@router.get("/{memo_id}", response_model=MemoResponse)
def get_memo(
    memo_id     : int,
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.visibility == VisibilityEnum.private and memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="This memo is private")
    return memo


# ── UPDATE memo ──────────────────────────────────────────────────
@router.patch("/{memo_id}", response_model=MemoResponse)
def update_memo(
    memo_id     : int,
    data        : MemoUpdate,
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your memo")

    if data.place_name is not None:
        memo.place_name  = data.place_name
    if data.description is not None:
        memo.description = data.description
    if data.visibility is not None:
        memo.visibility  = data.visibility

    if data.tag_ids is not None:
        if len(data.tag_ids) == 0:
            raise HTTPException(
                status_code=422,
                detail="At least one tag is required"
            )
        db.query(MemoTag).filter(MemoTag.memo_id == memo.id).delete()
        for tag_id in data.tag_ids:
            tag = db.query(Tag).filter(Tag.id == tag_id).first()
            if tag:
                db.add(MemoTag(memo_id=memo.id, tag_id=tag.id))

    db.commit()
    db.refresh(memo)
    return memo


# ── CHANGE VISIBILITY ─────────────────────────────────────────────
@router.patch("/{memo_id}/visibility", response_model=MemoResponse)
def change_visibility(
    memo_id    : int,
    visibility : VisibilityEnum = Query(
        ...,
        description="Choose: public | friends_only | private"
    ),
    db         : Session = Depends(get_db),
    current_user: User   = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your memo")

    memo.visibility = visibility
    db.commit()
    db.refresh(memo)
    return memo


# ── DELETE memo ──────────────────────────────────────────────────
@router.delete("/{memo_id}")
def delete_memo(
    memo_id     : int,
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your memo")

    db.delete(memo)
    db.commit()
    return {"message": "Memo deleted successfully"}


# ── ADD media to existing memo ───────────────────────────────────
@router.post("/{memo_id}/media", response_model=MemoResponse)
async def add_media(
    memo_id     : int,
    file        : UploadFile = File(...),
    db          : Session    = Depends(get_db),
    current_user: User       = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your memo")

    # ── validate file type ───────────────────────────────────────
    allowed = ["jpg", "jpeg", "png", "gif", "webp", "mp4", "mov"]
    ext     = file.filename.split(".")[-1].lower()
    if ext not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"File type .{ext} not allowed. Allowed: {allowed}"
        )

    url, media_type = await save_file(file)
    existing_count  = len(memo.media)

    db.add(MemoMedia(
        memo_id        = memo.id,
        file_url       = url,
        media_type     = media_type,
        order_position = existing_count,
    ))

    db.commit()
    db.refresh(memo)
    return memo


# ── DELETE single media ──────────────────────────────────────────
@router.delete("/{memo_id}/media/{media_id}")
def delete_media(
    memo_id     : int,
    media_id    : int,
    db          : Session = Depends(get_db),
    current_user: User    = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo or memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    media = db.query(MemoMedia).filter(MemoMedia.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")

    db.delete(media)
    db.commit()
    return {"message": "Media deleted"}