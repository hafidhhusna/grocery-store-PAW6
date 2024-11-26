import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = params.id; // Extract `userId` from the route parameter
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
    if (!userId) {
      return NextResponse.json({ error: 'UserId is required.' }, { status: 400 });
    }
  
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
  
      if (!cart) {
        return NextResponse.json({ message: 'Cart is empty.' }, { status: 200 });
      }
      
      // Forbid other user to get another user cart
      if (cart.userId !== token?.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
  
      return NextResponse.json(cart);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
    }
  }
  