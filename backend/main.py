from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import Base, engine
from app.api.endpoints import auth, wishlists, memos
from app.api.endpoints import profile as profile_routes
from app.models import User, Place, Tag, PlaceTag, Season, Wishlist, WishlistItem, profile

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    # During development allow all origins to avoid CORS issues from local ports.
    # Replace with a strict list (e.g. ["http://localhost:5173"]) before production.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(wishlists.router, prefix="/api/wishlists", tags=["wishlists"])
app.include_router(memos.router, prefix="/api/memos", tags=["memos"])
app.include_router(profile_routes.router, prefix="/api/profiles", tags=["profiles"])


@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}
