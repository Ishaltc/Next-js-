

import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


