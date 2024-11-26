import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Username already in use" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user along with their cart and account
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        cart: {
          create: {}, // Create an empty cart for the new user
        },
        accounts: {
          create: {
            type: "manual",
            provider: "credentials",
            providerAccountId: email, // Use email as a unique identifier
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      include: {
        cart: true, // Include the cart data in the response
        accounts: true, // Include the account data in the response
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
