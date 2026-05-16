from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String,  nullable=False)
    email         = Column(String,  unique=True, index=True, nullable=False)
    password_hash = Column(String,  nullable=False)
    created_at    = Column(DateTime, default=func.now())

    # existing relationships
    wishlists = relationship("Wishlist", back_populates="user")

    # new memo + friendship relationships
    memos            = relationship("Memo",       back_populates="user")
    sent_requests    = relationship("Friendship", back_populates="requester",
                                   foreign_keys="Friendship.requester_id")
    received_requests= relationship("Friendship", back_populates="receiver",
                                   foreign_keys="Friendship.receiver_id")