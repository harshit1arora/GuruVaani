from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Just-in-Time Classroom Coach"
    API_V1_PREFIX: str = "/api/v1"

    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    GROQ_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
