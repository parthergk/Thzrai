import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { NextResponse } from "next/server";

interface ImageInterface {
  prompt: string;
  img: string;
}

export const runtime = "nodejs";   // IMPORTANT
export const maxDuration = 60;     // IMPORTANT (Vercel)

export async function POST(req: Request) {
  try {
    const { prompt, img }: ImageInterface = await req.json();

    const base64Image = await convertAndImage(img);
    const analysisResult = await analyzeImage(prompt, base64Image);

    return NextResponse.json({
      success: true,
      data: analysisResult,
    });
  } catch (error) {
    console.error("Error in analyze-thumbnail API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process image and generate content" },
      { status: 500 }
    );
  }
}

// Helper to convert image
async function convertAndImage(imageUri: string): Promise<string> {
  try {
    const response = await axios.get(imageUri, {
      responseType: "arraybuffer",
      timeout: 8000,
    });

    return Buffer.from(response.data).toString("base64");
  } catch (error) {
    console.error("Error downloading the image:", error);
    throw new Error("Failed to download image");
  }
}

// Helper to analyze image with generative model
async function analyzeImage(prompt: string, imageUri: string): Promise<string> {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY is not defined");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageUri,
        },
      },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Error analyzing the image:", error);
    throw new Error("Failed to analyze image");
  }
}
