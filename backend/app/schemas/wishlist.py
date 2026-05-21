from pydantic import BaseModel
from datetime import datetime
from app.schemas.place import PlaceResponse

class WishlistItemCreate(BaseModel):
    place_id: int

class WishlistItemResponse(BaseModel):
    id: int
    wishlist_id: int
    place_id: int
    order_position: int
    is_pinned: int
    added_at: datetime
    place: PlaceResponse

    class Config:
        from_attributes = True
