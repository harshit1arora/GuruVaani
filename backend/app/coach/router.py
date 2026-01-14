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
):
    """
    Core AI coaching endpoint.
    Returns structured classroom guidance.
    """

    # 1️⃣ Build strict prompt
    prompt = build_prompt(
        class_level=data.class_level,
        subject=data.subject,
        problem_text=data.problem_text,
        language=data.language
    )

    # 2️⃣ Call Groq / LLM
    try:
        raw_output = call_groq(prompt)
        
        # 🔧 Clean AI response safely
        start = raw_output.find("{")
        end = raw_output.rfind("}") + 1
        if start != -1 and end != -1:
            raw_output = raw_output[start:end]
            
        parsed = json.loads(raw_output)
    except Exception as e:
        print(f"DEBUG: Coaching AI Error: {str(e)}")
        print(f"DEBUG: Raw AI Output: {raw_output if 'raw_output' in locals() else 'N/A'}")
        raise HTTPException(
            status_code=500,
            detail=f"AI coaching service error: {str(e)}"
        )

    # 3️⃣ Validate required fields
    required_fields = ["now_fix", "activity", "explain"]
    for field in required_fields:
        if field not in parsed:
            raise HTTPException(
                status_code=500,
                detail=f"AI response missing required field: {field}"
            )
        if not isinstance(parsed[field], dict) or "title" not in parsed[field] or "text" not in parsed[field]:
             raise HTTPException(
                status_code=500,
                detail=f"AI response field {field} must be an object with title and text"
            )

    return parsed
