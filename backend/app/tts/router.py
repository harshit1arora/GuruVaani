from fastapi import APIRouter
from pydantic import BaseModel

from app.tts.service import generate_tts

router = APIRouter(prefix="/tts", tags=["TTS"])

class TTSRequest(BaseModel):
    text: str

@router.post("/")
def tts(req: TTSRequest):
    return generate_tts(req.text)
