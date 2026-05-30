from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PeoTraveller API"
    
    # Database - Using SQLite by default (no setup needed)
    # The database file will be created automatically at: backend/peotraveller.db
    DATABASE_URL: str = "sqlite:///./peotraveller.db"
    
    # JWT Settings
    SECRET_KEY: str = "supersecretkey_change_me_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()


