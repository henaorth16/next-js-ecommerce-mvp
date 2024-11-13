import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { tx_ref } = await req.json();
    if (!tx_ref) {
      return NextResponse.json({ message: "Transaction reference is missing" }, { status: 400 });
    }

    // Configure headers with authorization
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Server-side request to Chapa’s API to verify transaction
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      header
    );

    const resp = response.data;
    console.log("Chapa response: ", resp);

    // Handle success case
    if (resp.status === "success") {
      return NextResponse.json({
        message: "Payment verified successfully",
        status: "success",
        data: resp.data,
      });
    }

    // Handle failure case
    return NextResponse.json({
      message: "Transaction verification failed",
      status: resp.status,
    });
  } catch (error: any) {
    console.error("Chapa verification error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error_code: error.code || "UNKNOWN_ERROR",
        message: error.response?.data?.message || "Verification failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
