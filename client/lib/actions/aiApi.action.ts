"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

interface ImageInterface {
  prompt: string;
  img: string;
}

// Main AI API function
export async function aiApi({ prompt, img }: ImageInterface): Promise<string> {
  try {

    const tempFilePath = await convertAndImage(img);

    const analysisResult = await analyzeImage(prompt, tempFilePath);

    return analysisResult;
  } catch (error) {
    console.error("Error in aiApi:", error);
    throw new Error("Failed to process image and generate content");
  }
}

// Helper to convert image
async function convertAndImage(imageUri: string): Promise<string> {
  try {
    const response = await axios.get(imageUri, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");

    return base64Image;
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
    console.log("Error analyzing the image:", error);
    throw new Error("Failed to analyze image");
  }
}
