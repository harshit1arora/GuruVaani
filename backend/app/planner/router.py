from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.auth.jwt import get_current_user
from app.planner.schemas import PlannerRequest, PlannerResponse
from app.planner.prompt import build_planner_prompt
from app.coach.groq_client import call_groq

router = APIRouter(
    prefix="/planner",
    tags=["Planner"]
)


@router.post("/generate", response_model=PlannerResponse)
def generate_planner(
    data: PlannerRequest,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user),
):
    """
    Generates a simple AI-assisted lesson plan.
    AI MUST return strict JSON.
    """

    # 1️⃣ Build prompt
    prompt = build_planner_prompt(
        grade=data.grade,
        subject=data.subject,
        time_available=data.time_available
    )

    # 2️⃣ Call AI
    ai_response = call_groq(prompt)

    # 🔧 Clean AI response safely
    start = ai_response.find("{")
    end = ai_response.rfind("}") + 1

    if start == -1 or end == -1:
        raise HTTPException(
        status_code=500,
        detail="Planner AI returned invalid JSON"
        )

    clean_json = ai_response[start:end]

    try:
        response = json.loads(clean_json)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Planner AI returned invalid JSON"
        )


    # 4️⃣ Validate structure
    if not all(k in response for k in ["steps", "engagement_idea", "exit_check"]):
        raise HTTPException(
            status_code=500,
            detail="Planner AI response missing required fields"
        )

    if not isinstance(response["steps"], list):
        raise HTTPException(
            status_code=500,
            detail="Planner steps must be a list"
        )

    # 5️⃣ Return clean response
    return PlannerResponse(
        steps=response["steps"],
        engagement_idea=response["engagement_idea"],
        exit_check=response["exit_check"]
    )
