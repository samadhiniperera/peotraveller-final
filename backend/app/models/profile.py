from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class UserProfile(Base):
    __tablename__="user_profiles"
    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), unique=True)  
    bio         = Column(String, nullable=True)
    profile_pic=Column(String, nullable=True)  # Store profile picture as binary data
    friendList=Column(String, nullable=True)  # Store friend list as a comma-separated string
    user        = relationship("User", back_populates="profile")
    
    