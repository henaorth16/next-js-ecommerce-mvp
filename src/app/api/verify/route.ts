import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";

interface ChapaResponse {
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    reference: string;
    currency: string;
    amount: string;
    customization: {
      description: string;
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    const { tx_ref } = await req.json();
    if (!tx_ref) {
      return NextResponse.json(
        { message: "Transaction reference is missing" },
        { status: 400 }
      );
    }
    console.log("txxxx__ref", tx_ref)

    // Configure headers
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Verify transaction with Chapa API
    const { data }: { data: ChapaResponse } = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      header
    );

    // Check Chapa response status
    if (data.status !== "success") {
      return NextResponse.json({
        message: "Transaction verification failed",
        status: data.status,
      });
    }

    // Save order to the database
    const paymentData = data.data;
    try {
      await db.order.create({
        data: {
          first_name: paymentData.first_name,
          last_name: paymentData.last_name,
          email: paymentData.email,
          phone: paymentData.phone_number,
          reference: paymentData.reference,
          currency: paymentData.currency,
          tx_ref: tx_ref,
          productId: paymentData.customization.description,
          pricePaidInCents: parseInt(paymentData.amount) * 100,
        },
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError.message);
      return NextResponse.json(
        { message: "Failed to save transaction to the database" },
        { status: 500 }
      );
    }

    // Successful response
    return NextResponse.json({
      message: "Payment verified and order saved successfully",
      status: "success",
      data: paymentData,
    });
  } catch (error: any) {
    console.error("Verification error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error_code: error.code || "UNKNOWN_ERROR",
        message: error.response?.data?.message || "Verification failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
