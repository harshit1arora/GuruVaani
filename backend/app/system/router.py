from fastapi import APIRouter
from app.system.health import health_check

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/health")
def health():
    return health_check()
