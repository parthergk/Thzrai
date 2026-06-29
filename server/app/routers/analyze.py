from fastapi import FastAPI
from pydantic import BaseModel
from services.image_url_to_base64 import image_url_to_base64

router = FastAPI()

class Image(BaseModel):
    image_url: str
    prompt: str

@router.post("/")
async def analyze_thumbnail(img: Image):
    base64Image = await image_url_to_base64(img.image_url)
    analyzeImage = await analyze_image(prompt, base64Image)