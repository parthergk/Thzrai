from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship
from core.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    username = Column(String(255), unique=True, index=True, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=True)
    verifyCode = Column(String, nullable=True)
    isVerified = Column(Boolean, default=False, nullable=False)
    provider = Column(String, default="credentials", nullable=False)
    
    thumbnails = relationship("Thumbnail", back_populates="user", cascade="all, delete-orphan")