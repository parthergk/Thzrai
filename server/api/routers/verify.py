from fastapi import Depends, APIRouter, HTTPException, Response, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import User
from services.auth_service import create_access_token

router  = APIRouter()

class VerifyUser(BaseModel):
    code: str
    username: str

@router.post("/")
async def verify_user(user: VerifyUser, response: Response, db: Session = Depends(get_db)):
    user_exist = db.query(User).filter(User.username == user.username).first()

    if not user_exist:
        raise HTTPException(
            status_code=404,
            detail="User does not exist with this username."
        )

    if user_exist.isVerified:
        return {"message": "Email is already verified.", "success": True}

    if user_exist.verifyCode != user.code:
        raise HTTPException(
            status_code=400,
            detail="Incorrect verification code."
        )

    try:
        user_exist.isVerified = True
        user_exist.verifyCode = None
        db.commit()
        db.refresh(user_exist)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An error occurred while verifying the user."
        )

    token = create_access_token({
        "user_id": user_exist.id,
        "email": user_exist.email
    })

    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=604800,  # 7 days
        samesite="lax",
        secure=True,    # Set to True in production (requires HTTPS)
        path="/"
    )

    return {
        "success": True,
        "email": user_exist.email,
        "user_id": user_exist.id,
        "message": "Email verified successfully."
    }
