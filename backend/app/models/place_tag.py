from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class PlaceTag(Base):
    __tablename__ = "place_tags"

    place_id = Column(Integer, ForeignKey("places.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id"), primary_key=True)

    place = relationship("Place", back_populates="tags")
    tag = relationship("Tag", back_populates="places")