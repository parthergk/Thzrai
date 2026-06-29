from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, HttpUrl
from services.download_image_from_url import download_image_from_url
from services.analyze_image import analyze_image
from services.get_current_user import get_current_user

router = APIRouter()

class Image(BaseModel):
    image_url: HttpUrl
    prompt: str

@router.post("")
async def analyze_thumbnail(img: Image, current_user_id: int = Depends(get_current_user)):
    try:
        image_bytes = await download_image_from_url(str(img.image_url))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to download or process image from URL: {str(e)}"
        )
        
    try:
        analyzeImage = await analyze_image(img.prompt, image_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI model analysis failed: {str(e)}"
        )

    return {
        "success": True,
        "data": analyzeImage
    }