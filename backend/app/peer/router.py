from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.peer import models, schemas

router = APIRouter(prefix="/peer", tags=["Peer Wisdom"])


@router.post("/post")
def create_post(
    data: schemas.PeerPostCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    post = models.PeerPost(**data.dict())
    db.add(post)
    db.commit()
    return {"message": "Post created"}


@router.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    return db.query(models.PeerPost).all()
