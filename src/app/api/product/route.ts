import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from 'src/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryId = url.searchParams.get('category');
  const searchQuery = url.searchParams.get('search') || ''; // Optional search query

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId }), // Only apply if categoryId is provided
        ...(searchQuery && { name: { contains: searchQuery, mode: 'insensitive' } }), // Case-insensitive search for product names
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  const data = await request.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}


export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: 'Product deleted' });
}

