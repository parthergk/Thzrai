from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserBase(BaseModel):
    name: str
    username: Optional[str] = None
    email: str
    isVerified: bool = False
    provider: str = "credentials"

class UserCreate(UserBase):
    password: str
    verifyCode: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    verifyCode: Optional[str] = None
    isVerified: Optional[bool] = None
    provider: Optional[str] = None

class UserResponse(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
