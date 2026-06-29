import os
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        return user_id
    except JWTError:
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired token"
            )