# app/create_tables.py
from app.database import Base, engine
from app.auth.models import User
from app.profile.models import Profile

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ All tables created successfully!")
