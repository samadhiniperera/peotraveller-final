from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from app.api.dependencies import get_db
from app.api.endpoints.auth import get_current_user
from app.models.user import User
from app.models.profile import UserProfile
from app.schemas.profileContoler import (
    BioResponse, BioUpdate,
    ProfilePicUpdate, ProfilePicResponse
)

router = APIRouter()


# ── UPDATE BIO ────────────────────────────────────────────────────
@router.put("/update-bio", response_model=BioResponse)
def update_bio(
    bio_data    : BioUpdate,
    current_user: User    = Depends(get_current_user),
    db          : Session = Depends(get_db)
):
    # Step 1: Get user's profile
    profile = db.query(UserProfile).filter(
        UserProfile.user_id == current_user.id
    ).first()

    # Step 2: Create if doesn't exist
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)

    # Step 3: Update bio
    profile.bio        = bio_data.bio
    profile.updated_at = datetime.utcnow()

    # Step 4: Save to database
    db.commit()
    db.refresh(profile)

    return profile


# ── UPDATE PROFILE PICTURE ────────────────────────────────────────
@router.put("/updateProfile", response_model=ProfilePicResponse)
def update_image(
    profileImagedata: ProfilePicUpdate,
    current_user    : User    = Depends(get_current_user),
    db              : Session = Depends(get_db)
):
    # Step 1: Get user's profile
    profile = db.query(UserProfile).filter(
        UserProfile.user_id == current_user.id
    ).first()

    # Step 2: Create if doesn't exist
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)

    # Step 3: Update profile picture
    profile.profile_pic = profileImagedata.profile_pic
    profile.updated_at  = datetime.utcnow()

    # Step 4: Save to database
    db.commit()
    db.refresh(profile)

    return profile