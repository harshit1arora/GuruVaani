from datetime import datetime, timedelta
from jose import jwt

from app.config import settings


def create_access_token(payload: dict):
    data = payload.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    data.update({"exp": expire})

    return jwt.encode(
        data,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )
