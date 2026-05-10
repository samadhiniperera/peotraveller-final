from pydantic import BaseModel
from typing import Optional

class PlaceBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None

class PlaceCreate(PlaceBase):
    pass

class PlaceResponse(PlaceBase):
    id: int

    class Config:
        from_attributes = True
