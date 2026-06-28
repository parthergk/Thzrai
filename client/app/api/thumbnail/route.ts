import Thumbnail from "@/database/models/dataModel";
import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const requiredBody = z.object({
    userId: z.string(),
    imgUrl: z.string(),
  });

  const parsedBody = requiredBody.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        message: "User Id and Image Url are required.",
      },
      { status: 400 }
    );
  }

  await connectDB();
  try {
    const user = await User.findById({ _id: parsedBody.data.userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const result = await Thumbnail.findOneAndUpdate(
      { img: parsedBody.data.imgUrl, user: parsedBody.data.userId },
      { img: parsedBody.data.imgUrl, user: user._id },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { success: true, message: "Image stored", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in thumbnail route:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const thumbnails = await Thumbnail.find({ user:userId });

    if (thumbnails.length === 0) {
      return NextResponse.json({ message: "No Thumbnails" }, { status: 404 });
    }

    return NextResponse.json({ thumbnails }, { status: 200 });
  } catch (error) {
    console.error("Server-side error while getting thumbnails:", error);
    return NextResponse.json(
      { error: "Server-side error while retrieving thumbnails" },
      { status: 500 }
    );
  }
}
