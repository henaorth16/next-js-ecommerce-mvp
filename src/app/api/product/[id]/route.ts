// app/api/product/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id; // Extract the id from the params
  
  // Add cache headers to prevent repeated triggering
  const headers = {
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=604800',
    'CDN-Cache-Control': 'public, max-age=300',
    'Vercel-CDN-Cache-Control': 'public, max-age=300',
  };

  try {
    // Fetch the product from the database using Prisma
    const product = await db.product.findFirst({
      where: { id },
      select: {
        id: true,
        name:true,
        priceInCents: true,
        imagePath:true,
        description: true,
        isAvailableForPurchase: true,
        isForMerchant: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' }, 
        { status: 404, headers }
      );
    }

    return NextResponse.json(
      product, 
      { status: 200, headers }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch product', error }, 
      { status: 500, headers }
    );
  }
}
