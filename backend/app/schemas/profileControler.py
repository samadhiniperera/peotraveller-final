from pydantic import BaseModel, Field

class bioUpdate(BaseModel):
    bio: str= Field(...,max_length=500, description="User biography, max 500 characters" )
    

class bioResponse(BaseModel):
    id: int
    user_id: int
    bio: str
    profile_pic: str | None
    friendList: str | None

    class Config:
        orm_mode = True    
        