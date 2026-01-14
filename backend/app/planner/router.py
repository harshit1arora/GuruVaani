from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.auth.jwt import get_current_user
from app.planner.schemas import PlannerRequest, PlannerResponse
from app.planner.prompt import build_planner_prompt
from app.coach.groq_client import call_groq

router = APIRouter(
    tags=["Planner"]
)


@router.post("/generate-plan", response_model=PlannerResponse)
def generate_planner(
    data: PlannerRequest,
    db: Session = Depends(get_db),
):
    """
    Generates an AI-assisted lesson plan with topic, competencies, interactive methods, and teacher tips.
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
    try:
        start = ai_response.find("{")
        end = ai_response.rfind("}") + 1

        if start == -1 or end == -1:
            raise ValueError("No JSON object found")

        clean_json = ai_response[start:end]
        response_data = json.loads(clean_json)
        
        # Validate required fields
        required_fields = ["topic", "competencies", "methods", "teacher_tip"]
        for field in required_fields:
            if field not in response_data:
                raise ValueError(f"Missing field: {field}")
                
        return PlannerResponse(**response_data)

    except Exception as e:
        print(f"DEBUG: JSON Parsing Error: {str(e)}")
        print(f"DEBUG: Failed AI Response: {ai_response}")
        raise HTTPException(
            status_code=500,
            detail=f"Planner AI returned invalid JSON: {str(e)}"
        )
