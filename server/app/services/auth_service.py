from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta
from jose import jwt
import bcrypt
import os

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password_bytes, salt).decode("utf-8")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def verify_google_token(token: str):
    google_client_id = os.getenv("GOOGLE_CLIENT_ID")
    if not google_client_id:
        raise ValueError("GOOGLE_CLIENT_ID environment variable is not set")
    
    user_info = id_token.verify_oauth2_token(
        token,
        requests.Request(),
        google_client_id
    )

    return user_info