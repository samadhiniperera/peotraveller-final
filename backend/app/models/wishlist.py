from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, default="My Wish List")
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="wishlists")
    items = relationship("WishlistItem", back_populates="wishlist")


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(Integer, primary_key=True, index=True)
    wishlist_id = Column(Integer, ForeignKey("wishlists.id"), nullable=False)
    place_id = Column(Integer, ForeignKey("places.id"), nullable=False)
    order_position = Column(Integer, default=0)   # for user ordering
    is_pinned = Column(Integer, default=0)        # 1 = pinned as next goal
    added_at = Column(DateTime, default=func.now())

    wishlist = relationship("Wishlist", back_populates="items")
    place = relationship("Place")