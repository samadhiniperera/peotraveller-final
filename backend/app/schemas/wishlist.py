from pydantic import BaseModel
from datetime import datetime
from app.schemas.place import PlaceResponse

class WishlistCreate(BaseModel):
    place_id: int

class WishlistResponse(BaseModel):
    id: int
    user_id: int
    place_id: int
    added_date: datetime
    place: PlaceResponse

    class Config:
        from_attributes = True
