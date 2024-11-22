import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    console.log("Request received for deletion");
    console.log("Params:", params);
    
    const cartItemId = params.id; // Extract cart item ID from the request URL
  
    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID is required.' }, { status: 400 });
    }
  
    try {
      // Check if the cart item exists
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
      });
  
      if (!cartItem) {
        return NextResponse.json({ error: 'Cart item not found.' }, { status: 404 });
      }
  
      // Delete the cart item
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
  
      return NextResponse.json({ message: 'Cart item deleted successfully.' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while deleting the cart item.' }, { status: 500 });
    }
  }

  export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const cartItemId = params.id;
  
    try {
      // Parse the JSON body to get the new quantity
      const { quantity } = await req.json();
  
      // Validate the quantity
      if (typeof quantity !== "number" || quantity <= 0) {
        return NextResponse.json({ error: "Invalid quantity value." }, { status: 400 });
      }
  
      // Check if the cart item exists
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
      });
  
      if (!cartItem) {
        return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
      }
  
      // Update the quantity in the database
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
  
      return NextResponse.json(updatedCartItem, { status: 200 });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      return NextResponse.json(
        { error: "An error occurred while updating the cart item quantity." },
        { status: 500 }
      );
    }
  }

  export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id; // Extract `userId` from the route parameter
  
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
  
      return NextResponse.json(cart);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
    }
  }
  