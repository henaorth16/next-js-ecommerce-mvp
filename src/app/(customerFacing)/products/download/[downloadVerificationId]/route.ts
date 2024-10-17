import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"


export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  // Fetch the product details and check if the download link is still valid
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { imagePath: true, name: true } } },
  })

  // If no valid data is found, redirect to the expired download page
  if (data == null) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url))
  }

  const fileUrl = data.product.imagePath // Assuming this is the Cloudinary URL stored in your DB
  const extension = fileUrl.split(".").pop()

  // Optionally, you can fetch metadata from Cloudinary to get file size or other info
  try {
    const cloudinaryMetadata = await cloudinary.api.resource(fileUrl)

    // Redirect to the Cloudinary URL to download the file
    return NextResponse.redirect(fileUrl, {
      headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": cloudinaryMetadata.bytes.toString(), // Use file size from Cloudinary metadata
      },
    })
  } catch (error: any) {
    // Handle any errors from Cloudinary
    return NextResponse.json({ error: `Failed to fetch file: ${error.message}` }, { status: 500 })
  }
}
