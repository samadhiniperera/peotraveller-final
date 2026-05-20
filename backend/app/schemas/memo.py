from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class VisibilityEnum(str, Enum):
    public       = "public"
    friends_only = "friends_only"
    private      = "private"


class MemoMediaResponse(BaseModel):
    id             : int
    file_url       : str
    media_type     : str
    order_position : int

    class Config:
        from_attributes = True


class MemoTagResponse(BaseModel):
    tag_id : int

    class Config:
        from_attributes = True


class MemoUpdate(BaseModel):
    place_name  : Optional[str]            = None   # ← added
    description : Optional[str]            = None
    visibility  : Optional[VisibilityEnum] = None
    tag_ids     : Optional[List[int]]      = None


class MemoResponse(BaseModel):
    id          : int
    user_id     : int
    place_name  : str                             # ← added
    place_id    : Optional[int]                   # ← now optional
    description : Optional[str]
    visibility  : VisibilityEnum
    created_at  : datetime
    updated_at  : datetime
    media       : List[MemoMediaResponse] = []
    tags        : List[MemoTagResponse]   = []

    class Config:
        from_attributes = True