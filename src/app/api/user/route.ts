import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define schema input validation
const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    //checking email if already exist
    const emailExist = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExist) {
      return NextResponse.json({ user: null, message: "Email already exist" }, { status: 409 });
    }

    //checking username if already exist
    const userExist = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (userExist) {
      return NextResponse.json({ user: null, message: "Username already exist" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong:(" }, { status: 500 });
  }
}
