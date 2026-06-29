from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from core.database import get_db
from models.thumbnail import Thumbnail
from models.user import User
from services.get_current_user import get_current_user
from pydantic import BaseModel

router = APIRouter()

class ThumbnailCreate(BaseModel):
    userId: int
    imgUrl: str

@router.post("")
async def create_thumbnail(
    payload: ThumbnailCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify authorization consistency
    if current_user_id != payload.userId:
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"success": False, "message": "Not authorized to create thumbnails for another user"}
        )

    # Verify the user exists
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"success": False, "message": "User not found"}
        )
    
    # Check if this thumbnail combination already exists (upsert)
    existing_thumbnail = db.query(Thumbnail).filter(
        Thumbnail.img == payload.imgUrl,
        Thumbnail.user_id == payload.userId
    ).first()
    
    if existing_thumbnail:
        db_thumbnail = existing_thumbnail
    else:
        db_thumbnail = Thumbnail(
            img=payload.imgUrl,
            user_id=payload.userId
        )
        db.add(db_thumbnail)
        db.commit()
        db.refresh(db_thumbnail)
        
    return {
        "success": True,
        "message": "Image stored",
        "data": {
            "id": db_thumbnail.id,
            "img": db_thumbnail.img,
            "user_id": db_thumbnail.user_id
        }
    }

@router.get("")
async def get_thumbnails(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    thumbnails = db.query(Thumbnail).filter(Thumbnail.user_id == current_user_id).all()
    
    if not thumbnails:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "No Thumbnails"}
        )
        
    return {
        "thumbnails": [
            {
                "id": t.id,
                "img": t.img,
                "user_id": t.user_id
            }
            for t in thumbnails
        ]
    }
