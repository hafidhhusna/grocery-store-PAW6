import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'src/lib/db';

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
