from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import User

router  = APIRouter()

class VerifyUser(BaseModel):
    code: str
    username: str

@router.post("/")
async def verify_user(user:VerifyUser, db: Session = Depends(get_db)):
    user_exist = db.query(User).filter(User.username == user.username).first()

    if not user_exist:
        raise HTTPException(
            status_code=404,
            detail= "User does not exist with this username."
        )

    if user_exist.isVerified:
        return {"message": "Email is already verified."}

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

    return {"message": "Email verified successfully."}
