import os
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.db.database import get_db
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
    place_id    : int              = Form(...),
    description : str              = Form(None),
    visibility  : VisibilityEnum   = Form(VisibilityEnum.private),
    tag_ids     : str              = Form(""),
    files       : List[UploadFile] = File([]),
    db          : Session          = Depends(get_db),
    current_user: User             = Depends(get_current_user),
):
    memo = Memo(
        user_id     = current_user.id,
        place_id    = place_id,
        description = description,
        visibility  = visibility,
    )
    db.add(memo)
    db.flush()

    # attach tags
    if tag_ids:
        for tag_id in [int(t) for t in tag_ids.split(",") if t]:
            tag = db.query(Tag).filter(Tag.id == tag_id).first()
            if tag:
                db.add(MemoTag(memo_id=memo.id, tag_id=tag.id))

    # save media
    for i, file in enumerate(files):
        if file.filename:
            url, media_type = await save_file(file)
            db.add(MemoMedia(
                memo_id        = memo.id,
                file_url       = url,
                media_type     = media_type,
                order_position = i,
            ))

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

    if data.description is not None:
        memo.description = data.description
    if data.visibility is not None:
        memo.visibility = data.visibility

    if data.tag_ids is not None:
        db.query(MemoTag).filter(MemoTag.memo_id == memo.id).delete()
        for tag_id in data.tag_ids:
            tag = db.query(Tag).filter(Tag.id == tag_id).first()
            if tag:
                db.add(MemoTag(memo_id=memo.id, tag_id=tag.id))

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
@router.post("/{memo_id}/media")
async def add_media(
    memo_id     : int,
    files       : List[UploadFile] = File(...),
    db          : Session          = Depends(get_db),
    current_user: User             = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")
    if memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your memo")

    existing_count = len(memo.media)
    for i, file in enumerate(files):
        if file.filename:
            url, media_type = await save_file(file)
            db.add(MemoMedia(
                memo_id        = memo.id,
                file_url       = url,
                media_type     = media_type,
                order_position = existing_count + i,
            ))

    db.commit()
    db.refresh(memo)
    return {"message": "Media added", "total_media": len(memo.media)}


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