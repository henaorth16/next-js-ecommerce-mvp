// app/api/product/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; // Extract the id from the params
  
  try {
    // Fetch the product from the database using Prisma
    const product = await db.product.findUnique({
      where: { id },
      select: {
        id: true,
        priceInCents: true,
        isAvailableForPurchase: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch product', error }, { status: 500 });
  }
}

