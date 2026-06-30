from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Thumbnail(Base):
    __tablename__ = "thumbnails"
    
    id = Column(Integer, primary_key=True, index=True)
    img = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    user = relationship("User", back_populates="thumbnails")
