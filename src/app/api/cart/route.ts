import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db' // Adjust the path based on your project structure
import { getToken } from 'next-auth/jwt';

// Add a product to a cart
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Forbid other user to post another user cart
    if (userId !== token?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!userId || !productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid data. Ensure userId, productId, and quantity are provided.' },
        { status: 400 }
      );
    }

    // Find the user's cart or create a new one
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // Check if the product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    // Check if the product is already in the cart
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (cartItem) {
      // Update the quantity of the existing cart item
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      // Add the product as a new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        },
      });
    }

    return NextResponse.json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}