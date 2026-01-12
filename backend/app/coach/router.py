from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.coach.schemas import CoachQueryRequest, CoachResponse
from app.coach.groq_client import call_groq
from app.coach.prompt_rules import build_prompt
from app.auth.jwt import get_current_user

router = APIRouter(
    prefix="/coach",
    tags=["AI Coach"]
)


@router.post("/query", response_model=CoachResponse)
def coach_query(
    data: CoachQueryRequest,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user),
):
    """
    Core AI coaching endpoint.
    Returns structured classroom guidance.
    """

    # 1️⃣ Build strict prompt
    prompt = build_prompt(
        class_level=data.class_level,
        subject=data.subject,
        problem_text=data.problem_text
    )

    # 2️⃣ Call Groq / LLM
    try:
        raw_output = call_groq(prompt)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )

    # 3️⃣ Enforce JSON-only response
    try:
        parsed = json.loads(raw_output)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="AI response was not valid JSON"
        )

    # 4️⃣ Validate required fields
    required_fields = ["immediate_fix", "simple_activity", "concept_explanation"]
    for field in required_fields:
        if field not in parsed or not parsed[field]:
            raise HTTPException(
                status_code=500,
                detail=f"AI response missing field: {field}"
            )

    return parsed
