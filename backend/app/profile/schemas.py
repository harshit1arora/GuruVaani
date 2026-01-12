from pydantic import BaseModel
from typing import Optional


class ProfileBase(BaseModel):
    full_name: str
    bio: Optional[str] = None
    expertise: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    teacher_id: int

    class Config:
        from_attributes = True