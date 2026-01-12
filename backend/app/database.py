from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Local SQLite DB (NO Docker, NO Postgres)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./teacher_ai.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # needed for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# ✅ THIS IS THE MISSING FUNCTION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
