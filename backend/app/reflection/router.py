from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.reflection.models import Reflection
from app.reflection.schemas import ReflectionCreate, ReflectionResponse
from app.auth.jwt import get_current_user
from app.auth.models import User

router = APIRouter(
    prefix="/reflection",
    tags=["Reflection"]
)


@router.post("/", response_model=ReflectionResponse)
def create_reflection(
    data: ReflectionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    reflection = Reflection(
        teacher_id=current_user.id,   # ✅ FIX HERE
        reflection_text=data.reflection_text,
        mood=data.mood,
        challenge=data.challenge,
        success=data.success,
    )

    db.add(reflection)
    db.commit()
    db.refresh(reflection)

    return reflection


@router.get("/", response_model=list[ReflectionResponse])
def get_reflections(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Reflection)
        .filter(Reflection.teacher_id == current_user.id)  # ✅ FIX HERE
        .all()
    )
