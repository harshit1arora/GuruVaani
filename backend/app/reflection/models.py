from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Reflection(Base):
    __tablename__ = "reflections"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    reflection_text = Column(String, nullable=False)
    mood = Column(String, nullable=False)
    challenge = Column(String, nullable=False)
    success = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
