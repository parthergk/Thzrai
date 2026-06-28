import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const requiredBody = z.object({
    code: z.string(),
    username: z.string(),
  });

  const parsedBody = requiredBody.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Username and verification code are required.",
      },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const user = await User.findOne({ username: parsedBody.data.username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist with this username." },
        { status: 404 }
      );
    }

    if (user.verifyCode === parsedBody.data.code) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        {
          success: true,
          email: user.email,
          message: "Email verification successful.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect verification code." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
