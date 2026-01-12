from pydantic import BaseModel
from typing import List


class PlannerRequest(BaseModel):
    grade: int
    subject: str
    time_available: int


class PlannerResponse(BaseModel):
    steps: List[str]
    engagement_idea: str
    exit_check: str
