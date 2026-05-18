import enum
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base


# ── Visibility enum ──────────────────────────────────────────────
class VisibilityEnum(str, enum.Enum):
    public       = "public"
    friends_only = "friends_only"
    private      = "private"


# ── Friendship status enum ───────────────────────────────────────
class FriendshipStatus(str, enum.Enum):
    pending  = "pending"
    accepted = "accepted"
    blocked  = "blocked"


# ── Memo ─────────────────────────────────────────────────────────
class Memo(Base):
    __tablename__ = "memos"

    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)
    place_id    = Column(Integer, ForeignKey("places.id"), nullable=False)
    description = Column(Text, nullable=True)
    visibility  = Column(
        Enum(VisibilityEnum),
        default=VisibilityEnum.private,   # ✅ default private
        nullable=False
    )
    created_at  = Column(DateTime, default=func.now())
    updated_at  = Column(DateTime, default=func.now(), onupdate=func.now())

    user   = relationship("User",      back_populates="memos")
    place  = relationship("Place",     back_populates="memos")
    media  = relationship("MemoMedia", back_populates="memo",
                          cascade="all, delete-orphan",
                          order_by="MemoMedia.order_position")
    tags   = relationship("MemoTag",   back_populates="memo",
                          cascade="all, delete-orphan")


# ── Memo media (images / videos) ─────────────────────────────────
class MemoMedia(Base):
    __tablename__ = "memo_media"

    id             = Column(Integer, primary_key=True, index=True)
    memo_id        = Column(Integer, ForeignKey("memos.id"), nullable=False)
    file_url       = Column(String,  nullable=False)
    media_type     = Column(String,  nullable=False)   # "image" or "video"
    order_position = Column(Integer, default=0)

    memo = relationship("Memo", back_populates="media")


# ── Memo ↔ Tag junction ──────────────────────────────────────────
class MemoTag(Base):
    __tablename__ = "memo_tags"

    memo_id = Column(Integer, ForeignKey("memos.id"), primary_key=True)
    tag_id  = Column(Integer, ForeignKey("tags.id"),  primary_key=True)

    memo = relationship("Memo", back_populates="tags")
    tag  = relationship("Tag",  back_populates="memos")  # ← updated


# ── Friendship ───────────────────────────────────────────────────
class Friendship(Base):
    __tablename__ = "friendships"

    id           = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id  = Column(Integer, ForeignKey("users.id"), nullable=False)
    status       = Column(
        Enum(FriendshipStatus),
        default=FriendshipStatus.pending,
        nullable=False
    )
    created_at   = Column(DateTime, default=func.now())

    requester = relationship("User", foreign_keys=[requester_id],
                             back_populates="sent_requests")
    receiver  = relationship("User", foreign_keys=[receiver_id],
                             back_populates="received_requests")