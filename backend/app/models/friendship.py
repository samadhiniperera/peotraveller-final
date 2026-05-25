
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base
 
class Friendship(Base):
     __tablename__ = "friendships"
     
     id = Column(Integer, primary_key=True, index=True)
     requester_id = Column(Integer, ForeignKey("users.id"), nullable=False)
     receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
     status = Column(String, default="pending")  # pending/accepted/blocked
     created_at = Column(DateTime, default=func.now())
     updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
     
     requester = relationship("User", foreign_keys=[requester_id], back_populates="sent_requests")
     receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_requests")