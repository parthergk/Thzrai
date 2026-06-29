import requests
import base64

async def image_url_to_base64(img_url: set):
    response = requests.get(url=img_url)

    if response.status_code != 200:
        raise Exception("Failed to download image")
    
    image_bytes = response.content

    base64_string = base64.b64encode(image_bytes).decode("utf-8")
    return base64_string;