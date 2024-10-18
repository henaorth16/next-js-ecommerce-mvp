import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Parse the body from the request
    const { tnx_ref } = await req.json();

    // Define headers for the Chapa API request
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Make the request to Chapa to verify the transaction
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tnx_ref}`,
      header
    );

    // Chapa's response data
    const resp = response.data;

    // Return success response
    return NextResponse.json({
      message: "Payment successful",
      status: "success",
      data: resp,
    });
  } catch (error: any) {
    // Return error response
    return NextResponse.json(
      {
        error_code: error.code || "UNKNOWN_ERROR",
        message: error.message || "Something went wrong",
      },
      { status: 400 }
    );
  }
}
