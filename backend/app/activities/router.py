from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.activities import schemas, prompt
from app.coach.groq_client import call_groq

router = APIRouter(prefix="/activities", tags=["Activities"])


@router.post("/generate", response_model=schemas.ActivityResponse)
def generate_activity(
    data: schemas.ActivityRequest,
    user_id: int = Depends(get_current_user),
):
    text = call_groq(prompt.activity_prompt(data))
    lines = [l for l in text.split("\n") if l.strip()]

    return {
        "steps": lines[:3],
        "grouping": "Mixed ability pairs",
        "quick_assessment": "Ask 2 students to explain",
    }
