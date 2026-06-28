# pyrefly: ignore [missing-import]
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message":"hello"}
