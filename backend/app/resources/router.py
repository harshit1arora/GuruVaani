from fastapi import APIRouter, Query
from app.resources.data import RESOURCES

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("/")
def get_resources(category: str = Query(...)):
    return {
        "category": category,
        "videos": RESOURCES.get(category, [])
    }
