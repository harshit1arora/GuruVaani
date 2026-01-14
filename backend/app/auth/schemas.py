from pydantic import BaseModel

# Request to send OTP
class OTPRequest(BaseModel):
    phone_number: str

# Response after sending OTP
class OTPResponse(BaseModel):
    status: str
    message: str

# Request to verify OTP
class OTPVerifyRequest(BaseModel):
    phone_number: str
    otp: str

# Response after verifying OTP (JWT token)
class OTPVerifyResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
