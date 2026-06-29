from fastapi import Depends, APIRouter
from core.database import SessionLoacal
from core.database import get_db
from app.models import User

router  = APIRouter()

@router.get("/user")
def get_user():
    return {"message":"hello"}

@router.post("/user")
def create_user(
    name: str,
    username: str,
    email: str,
    password: str,
    verifyCode: str,
    isVerified: bool = False,
    provider: str = "credentials",
    db: SessionLoacal = Depends(get_db)
):
    user = User(name=name, username=username, email=email, password=password, verifyCode=verifyCode, isVerified=isVerified, provider=provider)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message":"hello"}