import { prisma } from 'src/lib/db'
import { NextResponse, NextRequest} from 'next/server';

// Fetch all categories or a specific category by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('id');

  try {
    if (categoryId) {
      // Fetch a single category by ID
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: { products: true }
      });

      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json(category);
    } else {
      // Fetch all categories
      const categories = await prisma.category.findMany({ include: { products: true } });
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const category = await prisma.category.create({ data });
  return NextResponse.json(category);
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const category = await prisma.category.update({ where: { id }, data });
  return NextResponse.json(category);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ message: 'Category deleted' });
}
