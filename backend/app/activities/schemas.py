from pydantic import BaseModel
from typing import List

class ActivityRequest(BaseModel):
    class_size: int
    learning_levels: List[str]          # ✅ FIXED
    time_left: int
    materials_available: List[str]      # ✅ FIXED


class ActivityResponse(BaseModel):
    steps: List[str]
    grouping: str
    quick_assessment: str
