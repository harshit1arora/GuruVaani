from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.profile.models import Profile
from app.profile.schemas import ProfileCreate, ProfileResponse
from app.auth.jwt import get_current_user
from app.auth.models import User

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/", response_model=ProfileResponse)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(Profile).filter(
        Profile.teacher_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    return profile


@router.post("/", response_model=ProfileResponse)
def create_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = db.query(Profile).filter(
        Profile.teacher_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists"
        )

    profile = Profile(
        teacher_id=current_user.id,
        full_name=profile_data.full_name,
        bio=profile_data.bio,
        expertise=profile_data.expertise,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


@router.put("/", response_model=ProfileResponse)
def update_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(Profile).filter(
        Profile.teacher_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    profile.full_name = profile_data.full_name
    profile.bio = profile_data.bio
    profile.expertise = profile_data.expertise

    db.commit()
    db.refresh(profile)

    return profile
