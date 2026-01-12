from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.coach.groq_client import call_groq

router = APIRouter(prefix="/parent", tags=["Parent Bridge"])


@router.post("/message")
def generate_parent_message(
    student_name: str,
    topic: str,
    user_id: int = Depends(get_current_user),
):
    text = call_groq(
        f"Create a short respectful message for parent about {student_name} learning {topic}"
    )
    return {"message": text}
