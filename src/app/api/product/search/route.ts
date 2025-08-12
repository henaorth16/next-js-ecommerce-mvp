import { NextResponse } from "next/server";
import prisma from "./../../../../db/db"; // your Prisma client

export async function GET(req: Request) {
  const { search } = Object.fromEntries(new URL(req.url).searchParams);

  const items = await prisma.product.findMany({
    where: {
      name: {
        contains: search || "",
        mode: "insensitive", // case-insensitive
      },
    },
  });

  return NextResponse.json(items);
}
