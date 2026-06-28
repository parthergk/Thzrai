import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { sendOTP } from "@/helpers/sendOTP";

export async function POST(req: NextRequest) {

  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const requiredBody = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    provider: z.string()
  });

  const parsedBody = requiredBody.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const existUser = await User.findOne({
      username: parsedBody.data.username,
    });

    if (existUser) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    const existEmail = await User.findOne({
      email: parsedBody.data.email,
    });

    console.log('Email',existEmail);
    
    if (existEmail) {
      return NextResponse.json(
        { success: false, message: "User already exists with this Email" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(parsedBody.data.password, 10);

    const verificationCode = Math.floor(Math.random() * 10000).toString();

    const newUser = await User.create({
      name: parsedBody.data.name,
      username: parsedBody.data.username,
      email: parsedBody.data.email,
      password: hashPassword,
      verifyCode: verificationCode,
      isVerified: false,
      provider: 'credentials'
    });

    const emailResponse = await sendOTP(
      parsedBody.data.email,
      parsedBody.data.username,
      verificationCode
    );

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please verify your account.",
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred registering the user" },
      { status: 500 }
    );
  }
}
