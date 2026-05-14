from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    country = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=func.now())

    tags = relationship("PlaceTag", back_populates="place")
    seasons = relationship("Season", back_populates="place")