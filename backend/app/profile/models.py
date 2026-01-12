from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    # FIXED: link to users table
    teacher_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True
    )

    full_name = Column(String, nullable=False)
    bio = Column(String, nullable=True)
    expertise = Column(String, nullable=True)

    # optional but recommended
    user = relationship("User", backref="profile")
