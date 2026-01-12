from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class PeerPost(Base):
    __tablename__ = "peer_posts"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
