from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class BioUpdate(BaseModel):
    bio: str = Field(..., min_length=0, max_length=500)
    
    class Config:
        examples = {
            "example_1": {
                "value": {
                    "bio": "I love traveling to exotic places!"
                }
            }
        }


class BioResponse(BaseModel):
    id: int
    user_id: int
    bio: Optional[str]
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ProfileBase(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    profile_image_url: Optional[str] = None
    email: Optional[str] = None
    friend_list: Optional[str] = None


class ProfilePicResponse(BaseModel):
    id: int
    user_id: int
    profile_image_url:str
    
    
    class Config:
        from_attributes = True


class ProfilePicUpdate(BaseModel):
    profile_image_url:str
    
    