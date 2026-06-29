from fastapi import FastAPI, Depends
from core.database import Base, engine
from routers.user import router as user_router
from routers.verify import router as verify_router
from routers.auth import router as auth_router
from routers.thumbnail import router as thumbnail_router
from routers.analyze import router as analyze_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(verify_router, prefix="/verify")
app.include_router(auth_router, prefix="/auth")
app.include_router(thumbnail_router, prefix="/thumbnail")
app.include_router(analyze_router, prefix="/analyze")