from fastapi import FastAPI
from core.database import Base, engine
from routers.user import router as user_router
from routers.verify import router as verify_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(verify_router, prefix="/verify")

@app.post("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}