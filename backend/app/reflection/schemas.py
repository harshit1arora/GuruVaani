from pydantic import BaseModel
from datetime import datetime


class ReflectionCreate(BaseModel):
    reflection_text: str
    mood: str
    challenge: str
    success: str


class ReflectionResponse(ReflectionCreate):
    id: int
    teacher_id: int
    created_at: datetime

    class Config:
        orm_mode = True
