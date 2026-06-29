from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import User
from services.auth_service import create_access_token, verify_google_token
import bcrypt

router = APIRouter()


class Login_User(BaseModel):
    email: EmailStr
    password: str

class GoogleLoginRequest(BaseModel):
    token: str

@router.post('/login')
async def login(user: Login_User, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    # Prevent timing attacks and handle NoneType passwords for Google-registered users
    if not existing_user or not existing_user.password:
        bcrypt.checkpw(b"dummy_password", b"$2b$12$7kP.e0Gj3CymM1Rz4EeqreHl.pS4JtH2.R3S9P3m5Z4d7yH1m6sC.")
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    password = user.password.encode("utf-8")

    if not bcrypt.checkpw(password, existing_user.password.encode("utf-8")):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    if not existing_user.isVerified:
        raise HTTPException(
            status_code=403,
            detail="Please verify your email first"
        )
    token = create_access_token({
        "user_id": existing_user.id,
        "email": existing_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/google-login")
def google_login(data: GoogleLoginRequest, db: Session = Depends(get_db)):

    google_user = verify_google_token(data.token)

    user = db.query(User).filter(
        User.email == google_user["email"]
    ).first()

    if not user:
        user = User(
            name=google_user["name"],
            email=google_user["email"],
            username=google_user["email"].split("@")[0],
            isVerified=True,
            provider="google"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token({
        "user_id": user.id,
        "email": user.email
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }