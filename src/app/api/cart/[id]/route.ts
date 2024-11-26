import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
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

      // Check the cart exists
      const cart = await prisma.cart.findUnique({
        where: {id: cartItem?.cartId}
      })

      // Forbid other users to delete the cart item from another user
      if (!cart) {
        return NextResponse.json({ error: 'Cart not found.' }, { status: 404 });
      }else{
        if (cart.userId !== token?.id) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }

      // Delete the cart item
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
  
      return NextResponse.json({ message: 'Cart item deleted successfully.' }, { status: 200 });
    } catch (error:any) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while deleting the cart item.' }, { status: 500 });
    }
  }

  export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
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

      // Check the cart exists
      const cart = await prisma.cart.findUnique({
        where: {id: cartItem?.cartId}
      })

      // Forbid other users to delete the cart item from another user
      if (!cart) {
        return NextResponse.json({ error: 'Cart not found.' }, { status: 404 });
      }else{
        if (cart.userId !== token?.id) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }
  
      // Update the quantity in the database
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
  
      return NextResponse.json(updatedCartItem, { status: 200 });
    } catch (error:any) {
      console.error("Error updating cart item quantity:", error);
      return NextResponse.json(
        { error: "An error occurred while updating the cart item quantity." },
        { status: 500 }
      );
    }
  }