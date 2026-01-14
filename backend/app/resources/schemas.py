from pydantic import BaseModel
from typing import List


class VideoSuggestionRequest(BaseModel):
    grade: int
    subject: str
    topic: str
    time_available: int = 30


class ClusterVideoRequest(BaseModel):
    cluster_name: str
    description: str


class Video(BaseModel):
    id: str
    title: str
    channel: str
    duration: str
    url: str


class VideoSuggestionResponse(BaseModel):
    videos: List[Video]
    disclaimer: str = "Videos are provided as reference or inspiration, not as a replacement for teaching."
