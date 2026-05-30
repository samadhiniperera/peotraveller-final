from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.place import Place
from app.schemas.place import PlaceResponse

router = APIRouter()


@router.get("/", response_model=List[PlaceResponse])
def get_all_places(
    limit: Optional[int] = Query(None, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Place).order_by(Place.id.asc())
    if limit is not None:
        query = query.limit(limit)
    return query.all()
