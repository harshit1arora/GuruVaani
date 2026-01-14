import os
import requests
import re
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.auth.jwt import get_current_user
from app.resources.schemas import VideoSuggestionRequest, VideoSuggestionResponse, Video, ClusterVideoRequest
from app.config import settings
from app.coach.groq_client import call_groq
from youtubesearchpython import VideosSearch

router = APIRouter(tags=["Resources"])

def parse_duration(duration_str: str) -> str:
    """Parses ISO 8601 duration (e.g. PT5M33S) to human readable (e.g. 5:33)"""
    match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration_str)
    if not match:
        return "Unknown"
    
    hours, minutes, seconds = match.groups()
    hours = int(hours) if hours else 0
    minutes = int(minutes) if minutes else 0
    seconds = int(seconds) if seconds else 0
    
    if hours > 0:
        return f"{hours}:{minutes:02d}:{seconds:02d}"
    return f"{minutes}:{seconds:02d}"

def is_within_duration(duration_str: str, min_mins: int = 3, max_mins: int = 10) -> bool:
    """Checks if duration is within preferred range"""
    match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration_str)
    if not match:
        return False
    
    hours, minutes, _ = match.groups()
    total_minutes = (int(hours) * 60 if hours else 0) + (int(minutes) if minutes else 0)
    return min_mins <= total_minutes <= max_mins

def is_within_duration_simple(duration_str: str, min_mins: int = 3, max_mins: int = 10) -> bool:
    """Checks if duration string (e.g. '5:33' or '1:05:12') is within preferred range"""
    try:
        parts = duration_str.split(':')
        if len(parts) == 2:
            minutes = int(parts[0])
        elif len(parts) == 3:
            minutes = int(parts[0]) * 60 + int(parts[1])
        else:
            return False
        return min_mins <= minutes <= max_mins
    except:
        return False

@router.post("/video-suggestions", response_model=VideoSuggestionResponse)
def get_video_suggestions(
    data: VideoSuggestionRequest,
    db: Session = Depends(get_db),
):
    """
    Fetches real YouTube video recommendations based on grade, subject, and topic using youtube-search-python.
    """
    # 0️⃣ Generate optimized search query using Groq
    try:
        query_prompt = f"""
        Generate a single, highly effective YouTube search query for a teacher to find classroom-usable educational videos.
        Grade: {data.grade}
        Subject: {data.subject}
        Topic: {data.topic}
        Session Duration: {data.time_available} minutes
        Focus on: Concept explanation, practical demonstrations, or classroom activities.
        Avoid: Long lectures or low-quality content.
        Respond with ONLY the search query string, nothing else.
        """
        optimized_query = call_groq(query_prompt).strip().strip('"')
        print(f"Optimized Query for '{data.topic}': {optimized_query}")
    except Exception as e:
        print(f"Groq query optimization failed: {e}")
        optimized_query = f"Grade {data.grade} {data.subject} {data.topic} educational classroom"

    # 1️⃣ Search for videos using youtube-search-python (Quota-free)
    try:
        videos_search = VideosSearch(optimized_query, limit=10)
        search_results = videos_search.result().get("result", [])
        
        if not search_results:
            return VideoSuggestionResponse(videos=[], disclaimer="No videos found for this topic.")

        suggested_videos = []
        # Calculate ideal duration range based on session time
        min_d = 2
        max_d = min(10, max(5, data.time_available // 3))
        
        for item in search_results:
            duration = item.get("duration")
            if not duration:
                continue
                
            # Filter by dynamic duration
            if is_within_duration_simple(duration, min_d, max_d):
                suggested_videos.append(Video(
                    id=item["id"],
                    title=item["title"],
                    channel=item["channel"]["name"],
                    duration=duration,
                    url=item["link"]
                ))
            
            # Stop if we have 3 good suggestions
            if len(suggested_videos) >= 3:
                break
        
        # Fallback if no videos matched duration filter - take top 2 from search results anyway
        if not suggested_videos and search_results:
            for item in search_results[:2]:
                suggested_videos.append(Video(
                    id=item["id"],
                    title=item["title"],
                    channel=item["channel"]["name"],
                    duration=item.get("duration", "Unknown"),
                    url=item["link"]
                ))

        return VideoSuggestionResponse(
            videos=suggested_videos,
            disclaimer="Videos are provided as reference or inspiration, not as a replacement for teaching."
        )

    except Exception as e:
        print(f"YouTube Search Error: {str(e)}")
        # Return high-quality pedagogical fallback videos if search fails
        return VideoSuggestionResponse(
            videos=[
                Video(
                    id="8mX_5N-uVls",
                    title="Effective Classroom Management Strategies",
                    channel="Edutopia",
                    duration="5:12",
                    url="https://www.youtube.com/watch?v=8mX_5N-uVls"
                ),
                Video(
                    id="r2856S3R6pg",
                    title="Active Learning Strategies for the Classroom",
                    channel="Teaching & Learning",
                    duration="4:45",
                    url="https://www.youtube.com/watch?v=r2856S3R6pg"
                ),
                Video(
                    id="1-T77_f3zS8",
                    title="Engaging Students in Large Classrooms",
                    channel="Global Education",
                    duration="6:30",
                    url="https://www.youtube.com/watch?v=1-T77_f3zS8"
                )
            ],
            disclaimer="Note: Real-time search is currently unavailable. Providing curated pedagogical resources."
        )

@router.post("/cluster-videos", response_model=VideoSuggestionResponse)
def get_cluster_videos(
    data: ClusterVideoRequest,
    db: Session = Depends(get_db),
):
    """
    Fetches real YouTube video recommendations for pedagogical clusters using youtube-search-python.
    """
    # 1️⃣ Search for videos using youtube-search-python (Quota-free)
    try:
        query = f"{data.cluster_name} {data.description} teaching tips classroom"
        videos_search = VideosSearch(query, limit=10)
        search_results = videos_search.result().get("result", [])
        
        if not search_results:
            return VideoSuggestionResponse(videos=[], disclaimer="No videos found for this cluster.")

        suggested_videos = []
        for item in search_results:
            duration = item.get("duration")
            if not duration:
                continue
                
            # Filter by duration (2-15 mins for pedagogical tips)
            if is_within_duration_simple(duration, 2, 15):
                suggested_videos.append(Video(
                    id=item["id"],
                    title=item["title"],
                    channel=item["channel"]["name"],
                    duration=duration,
                    url=item["link"]
                ))
            
            if len(suggested_videos) >= 5:
                break
        
        # Fallback
        if not suggested_videos and search_results:
            for item in search_results[:3]:
                suggested_videos.append(Video(
                    id=item["id"],
                    title=item["title"],
                    channel=item["channel"]["name"],
                    duration=item.get("duration", "Unknown"),
                    url=item["link"]
                ))

        return VideoSuggestionResponse(
            videos=suggested_videos,
            disclaimer="Pedagogical resources for classroom improvement."
        )

    except Exception as e:
        print(f"YouTube Cluster Search Error: {str(e)}")
        # Return high-quality pedagogical fallback videos if API fails
        return VideoSuggestionResponse(
            videos=[
                Video(
                    id="8mX_5N-uVls",
                    title="Effective Classroom Management Strategies",
                    channel="Edutopia",
                    duration="5:12",
                    url="https://www.youtube.com/watch?v=8mX_5N-uVls"
                ),
                Video(
                    id="r2856S3R6pg",
                    title="Active Learning Strategies for the Classroom",
                    channel="Teaching & Learning",
                    duration="4:45",
                    url="https://www.youtube.com/watch?v=r2856S3R6pg"
                ),
                Video(
                    id="1-T77_f3zS8",
                    title="Engaging Students in Large Classrooms",
                    channel="Global Education",
                    duration="6:30",
                    url="https://www.youtube.com/watch?v=1-T77_f3zS8"
                )
            ],
            disclaimer="Note: Search error. Providing curated pedagogical resources."
        )

