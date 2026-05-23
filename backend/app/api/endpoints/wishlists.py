from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.api.endpoints.auth import get_current_user
from app.models.memo import Memo, VisibilityEnum
from app.models.place import Place
from app.models.user import User
from app.models.wishlist import Wishlist, WishlistItem
from app.schemas.wishlist import WishlistItemCreate, WishlistItemResponse

router = APIRouter()


def get_or_create_default_wishlist(db: Session, user: User) -> Wishlist:
    wishlist = db.query(Wishlist).filter(Wishlist.user_id == user.id).first()
    if not wishlist:
        wishlist = Wishlist(user_id=user.id)
        db.add(wishlist)
        db.flush()
    return wishlist


@router.get("/", response_model=List[WishlistItemResponse])
def get_wishlists(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    wishlist = db.query(Wishlist).filter(Wishlist.user_id == current_user.id).first()
    if not wishlist:
        return []
    return db.query(WishlistItem).filter(WishlistItem.wishlist_id == wishlist.id).all()


@router.post("/", response_model=WishlistItemResponse)
def add_to_wishlist(
    data: WishlistItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    place = db.query(Place).filter(Place.id == data.place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")

    wishlist = get_or_create_default_wishlist(db, current_user)
    existing = db.query(WishlistItem).filter(
        WishlistItem.wishlist_id == wishlist.id,
        WishlistItem.place_id == place.id,
    ).first()
    if existing:
        return existing

    item = WishlistItem(
        wishlist_id    = wishlist.id,
        place_id       = place.id,
        order_position = len(wishlist.items),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.post("/from-memo/{memo_id}", response_model=WishlistItemResponse)
def add_wishlist_from_memo(
    memo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found")

    if memo.visibility != VisibilityEnum.public and memo.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Memo is not public")

    if memo.place_id is None:
        raise HTTPException(status_code=400, detail="Memo does not reference a place")

    place = db.query(Place).filter(Place.id == memo.place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place referenced by memo not found")

    wishlist = get_or_create_default_wishlist(db, current_user)
    existing = db.query(WishlistItem).filter(
        WishlistItem.wishlist_id == wishlist.id,
        WishlistItem.place_id == place.id,
    ).first()
    if existing:
        return existing

    item = WishlistItem(
        wishlist_id    = wishlist.id,
        place_id       = place.id,
        order_position = len(wishlist.items),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def remove_wishlist_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.query(WishlistItem).filter(WishlistItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Wishlist item not found")

    wishlist = db.query(Wishlist).filter(Wishlist.id == item.wishlist_id).first()
    if not wishlist or wishlist.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed to remove this item")

    db.delete(item)
    db.commit()
    return {"message": "Wishlist item removed"}
