import { NextResponse} from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Fetch all orders without filtering by userId
    const orders = await prisma.order.findMany({
      include: {
        items: true, // Include the associated items in the response if needed
      },
    });

    if (orders.length === 0) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders);
  } catch (error:any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
