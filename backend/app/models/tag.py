from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base

class Tag(Base):
    __tablename__ = "tags"

    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    places = relationship("PlaceTag", back_populates="tag")
    memos  = relationship("MemoTag",  back_populates="tag")  # ← ADD