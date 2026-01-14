from fastapi import FastAPI

from app.config import settings
from app.database import Base, engine
from app.middleware import setup_middleware

from app.auth.router import router as auth_router
from app.profile.router import router as profile_router
from app.coach.router import router as coach_router
from app.planner.router import router as planner_router
from app.activities.router import router as activities_router
from app.resources.router import router as resources_router
from app.peer.router import router as peer_router
from app.reflection.router import router as reflection_router
from app.parent_bridge.router import router as parent_router
from app.system.router import router as system_router


app = FastAPI(title=settings.PROJECT_NAME)

setup_middleware(app)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix=settings.API_V1_PREFIX)
app.include_router(profile_router, prefix=settings.API_V1_PREFIX)
app.include_router(coach_router, prefix=settings.API_V1_PREFIX)
app.include_router(planner_router, prefix=settings.API_V1_PREFIX + "/planner")
app.include_router(activities_router, prefix=settings.API_V1_PREFIX)
app.include_router(resources_router, prefix=settings.API_V1_PREFIX + "/resources")
app.include_router(peer_router, prefix=settings.API_V1_PREFIX)
app.include_router(reflection_router, prefix=settings.API_V1_PREFIX)
app.include_router(parent_router, prefix=settings.API_V1_PREFIX)
app.include_router(system_router, prefix=settings.API_V1_PREFIX)

# Direct aliases for requested routes (exactly as requested)
app.include_router(planner_router, prefix="/api")
app.include_router(resources_router, prefix="/api")


@app.get("/")
def root():
    return {"status": "Backend running"}
