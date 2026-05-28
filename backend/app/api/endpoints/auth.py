from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings
import jwt

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


# ── REGISTER ─────────────────────────────────────────────────────
@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(
        email         = user.email,
        name          = user.name,
        password_hash = hashed_password,
        role          = user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# ── LOGIN ─────────────────────────────────────────────────────────
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),   # ← changed
    db       : Session                   = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == form_data.username).first()
    if not db_user or not verify_password(form_data.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": db_user.email, "role": db_user.role.value}
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user.role.value
    }


# ── GET CURRENT USER ──────────────────────────────────────────────
def get_current_user(
    token: str     = Depends(oauth2_scheme),
    db   : Session = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user