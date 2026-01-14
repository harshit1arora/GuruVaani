from pydantic import BaseModel
from typing import List


class PlannerRequest(BaseModel):
    grade: int
    subject: str
    time_available: int


class TeachingMethod(BaseModel):
    title: str
    description: str
    time: str


class PlannerResponse(BaseModel):
    topic: str
    competencies: List[str]
    methods: List[TeachingMethod]
    teacher_tip: str
