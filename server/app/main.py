from fastapi import FastAPI, Depends
from core.database import Base, engine
from routers.user import router as user_router
from routers.verify import router as verify_router
from routers.auth import router as auth_router
from services.get_current_user import get_current_user

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(verify_router, prefix="/verify")
app.include_router(auth_router, prefix="/auth")

@app.get("/profile")
async def get_profile(currnet_profile: str = Depends(get_current_user)):
     return {
        "message": "This is highly classified information", 
        "user": currnet_profile
    }