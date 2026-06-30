from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from core.database import get_db
from models.user import User
from services.auth_service import create_access_token, verify_google_token
from services.get_current_user import get_current_user
import bcrypt

router = APIRouter()

class Login_User(BaseModel):
    email: EmailStr
    password: str

class GoogleLoginRequest(BaseModel):
    token: str

@router.post('/login')
async def login(user: Login_User, response: Response, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    # Prevent timing attacks and handle NoneType passwords for Google-registered users
    if not existing_user or not existing_user.password:
        bcrypt.checkpw(b"dummy_password", b"$2b$12$7kP.e0Gj3CymM1Rz4EeqreHl.pS4JtH2.R3S9P3m5Z4d7yH1m6sC.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    password = user.password.encode("utf-8")

    if not bcrypt.checkpw(password, existing_user.password.encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not existing_user.isVerified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please verify your email first"
        )
        
    token = create_access_token({
        "user_id": existing_user.id,
        "email": existing_user.email
    })

    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=604800,  # 7 days
        samesite="strict",
        secure=True,    # Set to True in production (requires HTTPS)
        path="/"
    )

    return {
        "user_id": existing_user.id,
        "email": existing_user.email,
        "name": existing_user.name,
        "username": existing_user.username
    }

@router.post("/google-login")
def google_login(data: GoogleLoginRequest, response: Response, db: Session = Depends(get_db)):
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

    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=604800,  # 7 days
        samesite="strict",
        secure=True,    # Set to True in production (requires HTTPS)
        path="/"
    )

    return {
        "user_id": user.id,
        "email": user.email,
        "name": user.name,
        "username": user.username
    }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"message": "Logged out successfully"}

@router.get("/me")
def get_me(current_user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "username": user.username
    }