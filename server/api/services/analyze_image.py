import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_AI_API_KEY")
client = genai.Client(api_key=gemini_key)

async def analyze_image(prompt: str, image_bytes: bytes):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image_bytes,
                mime_type="image/jpeg"
            )
        ]
    )
    return response.text