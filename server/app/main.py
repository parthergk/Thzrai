from fastapi import FastAPI, Depends
from core.database import Base, engine
from routers.user import router as user_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)

@app.post("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}