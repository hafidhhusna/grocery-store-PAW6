import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'src/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; // Retrieve the product ID from URL parameters
  try {
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const body = await req.json(); // Parse the request body for updated data
    const { name, price, quantity, categoryId } = body; // Example of fields you might want to update

    if (!name || !price || !quantity) {
      return NextResponse.json({ error: 'Name, price, and quantity are required' }, { status: 400 });
    }
 
    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        price,
        quantity,
        categoryId
      },
    });

    return NextResponse.json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id; // Retrieve the product ID from query parameters
  try {

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
