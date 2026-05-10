from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PeoTraveller API"
    
    # ===================== DATABASE CONNECTION =====================
    # This is automatically loaded from the .env file.
    # Format: postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
    # Example: postgresql://postgres:mypassword@localhost:5432/peotraveller
    # ===============================================================
    DATABASE_URL: str = "sqlite:///./peotraveller.db"
    
    # JWT Settings
    SECRET_KEY: str = "supersecretkey_change_me_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"  # ← Automatically reads from backend/.env file

settings = Settings()


