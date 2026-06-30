import requests

async def download_image_from_url(img_url: str):
    response = requests.get(url=img_url)

    if response.status_code != 200:
        raise Exception("Failed to download image")
    
    image_bytes = response.content
    return image_bytes