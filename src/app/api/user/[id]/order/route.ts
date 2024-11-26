import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const userId = params.id; // Extract `userId` from the route parameter

  try {
    const { items } = await req.json();

    console.log(items);

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      );
    }

    // Fetch user to ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: item.cartItemId },
      });

      if (!cartItem) {
        return NextResponse.json({ error: `Product not found: ${item.cartItemId}` }, { status: 404 });
      }

      totalPrice += cartItem.price * cartItem.quantity;
    }

    // Create a unique order number
    const orderNo = `ORD-${Date.now()}`;

    // Create the order with associated items
    const order = await prisma.order.create({
        data: {
          userId,
          items: {
            connect: items.map((item: any) => ({
              id: item.cartItemId, // Use the ID of the existing CartItem
            })),
          },
          totalPrice,
          orderNo,
        },
        include: {
          items: true, // Include the associated items in the response
        },
      });

      // Update `isCheckout` status for the selected cart items
    await prisma.cartItem.updateMany({
        where: {
          id: { in: items.map((item: any) => item.cartItemId) },
        },
        data: { isCheckout: true },
      });
      

    return NextResponse.json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
