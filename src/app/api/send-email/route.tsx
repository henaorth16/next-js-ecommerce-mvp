import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";
import db from "@/db/db";
import { auth, } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {

  const { productId, username } = await req.json();
  const product = await db.product.findUnique({
    where: {
      id: productId,
      isAvailableForPurchase: true,
    },
    select: {
      id:true,
      name: true,
      priceInCents: true,
      imagePath:true,
      description: true,
      isAvailableForPurchase:true,
    },
  })
  if(!product) {
    return NextResponse.json(
      { message: "Failed to send email the product not found"},
      { status: 500 }
    );
  }

  try {
    // Send the email using Resend
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: 'emyayehenok@gmail.com',
      subject: "Order Confirmation",
      react: (<PurchaseReceiptEmail product={product} username={username}/>),
    });

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
