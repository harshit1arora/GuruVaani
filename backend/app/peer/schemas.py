from pydantic import BaseModel


class PeerPostCreate(BaseModel):
    title: str
    description: str
