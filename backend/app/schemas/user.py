from pydantic import BaseModel
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    traveler       = "traveler"
    travelGuide    = "travelGuide"
    admin          = "admin"
    contentUpdater = "contentUpdater"

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    role: UserRole = UserRole.traveler

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
