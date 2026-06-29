from fastapi import Depends, APIRouter, HTTPException
import secrets
from sqlalchemy.orm import Session
from core.database import get_db
from models import User
from Schemas.user import UserCreate
from services.auth_service import hash_password
from services.verification_service import send_otp

router  = APIRouter()

@router.get("/user")
def get_user():
    return {"message":"hello"}

@router.post("/user")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    exist_user = db.query(User).filter(User.username == user.username).first()

    if exist_user:
        raise HTTPException(
            status_code=409,
            detail="Username already exists"
        )

    exist_email  = db.query(User).filter(User.email == user.email).first()
    if exist_email:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    try:
        # hash the password
        hashPassword = hash_password(user.password)

        verification_code = str(secrets.randbelow(9000) + 1000)

        new_user = User(
            name=user.name,
            username=user.username,
            email=user.email,
            password=hashPassword,
            verifyCode=str(verification_code),
            isVerified=user.isVerified,
            provider=user.provider
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        print(e)
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An error occurred while creating the user"
        )

    # Send verification email
    try:
        await send_otp(user.email, user.username, str(verification_code))
    except Exception as e:
        print(e)
        raise HTTPException(
        status_code=500,
        detail="Failed to send verification email"
    )

    return {"message": "User registered successfully. Please verify your email."}