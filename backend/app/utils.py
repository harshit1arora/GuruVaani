# app/utils.py

from datetime import datetime, timedelta
from typing import Optional
import jwt
from app.config import settings  # make sure you have a config.py that loads .env

# Use values from .env via settings
SECRET_KEY = settings.JWT_SECRET
ALGORITHM = settings.JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT token with the given data and expiration.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
