# app/auth/router.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta
import random

from app.database import get_db
from app.auth.models import User
from app.auth.schemas import OTPRequest, OTPVerifyResponse, OTPResponse
from app.utils import create_access_token  # function to create JWT

router = APIRouter(tags=["Auth"], prefix="/auth")

# In-memory OTP store for testing
otp_store = {}

# --- Schemas ---
class OTPSendRequest(BaseModel):
    phone_number: str

class OTPVerifyRequest(BaseModel):
    phone_number: str
    otp: str

# --- Endpoints ---

@router.post("/send-otp", response_model=OTPResponse)
def send_otp(data: OTPSendRequest, db: Session = Depends(get_db)):
    """
    Send OTP to user phone number.
    """
    # Use sample OTP for specific phone number as requested
    if data.phone_number == "9958260953":
        otp = "200510"
    else:
        # Generate 6-digit OTP for other numbers
        otp = str(random.randint(100000, 999999))
    
    # Store in memory with expiry
    otp_store[data.phone_number] = {
        "otp": otp,
        "expires_at": datetime.utcnow() + timedelta(minutes=5)
    }

    # Create user if not exists
    user = db.query(User).filter(User.phone_number == data.phone_number).first()
    if not user:
        user = User(phone_number=data.phone_number)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Normally here you would send SMS via service
    print(f"OTP for {data.phone_number}: {otp}")  # For local testing

    return {"status": "ok", "message": f"OTP sent to {data.phone_number}"}


@router.post("/verify-otp", response_model=OTPVerifyResponse)
def verify_otp(data: OTPVerifyRequest, db: Session = Depends(get_db)):
    """
    Verify OTP sent to user and return access token.
    """
    otp_entry = otp_store.get(data.phone_number)
    if not otp_entry:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No OTP sent for this number")

    # Check OTP expiry
    if datetime.utcnow() > otp_entry["expires_at"]:
        del otp_store[data.phone_number]
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP expired")

    # Check OTP correctness
    if otp_entry["otp"] != data.otp:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    # OTP correct  return JWT token
    user = db.query(User).filter(User.phone_number == data.phone_number).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create token
    access_token = create_access_token({"user_id": user.id})
    
    # Cleanup OTP after successful verification
    del otp_store[data.phone_number]

    return {"access_token": access_token, "token_type": "bearer"}
