import db from "@/db/db"
import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { imagePath: true, name: true },
  })

  if (product == null) return notFound()

  const { size } = await fs.stat(product.imagePath)
  const file = await fs.readFile(product.imagePath)
  const extension = product.imagePath.split(".").pop()

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  })
}
