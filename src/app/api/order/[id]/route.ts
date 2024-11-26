import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const  id  = params.id; // Order ID from the URL parameter
  try {
    const { status } = await req.json(); // New status from the request body

    // Validate status to be either "processing" or "confirmed"
    if (!status || !Object.values({ processing: 'processing', confirmed: 'confirmed' }).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Find the order by ID and update its status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error:any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
