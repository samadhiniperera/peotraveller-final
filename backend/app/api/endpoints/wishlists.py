from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_db

router = APIRouter()


@router.get("/")
def get_wishlists(db: Session = Depends(get_db)):
    return {"message": "Wishlist endpoints will go here"}
