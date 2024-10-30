import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { tx_ref } = await req.json(); // Get the transaction reference
    if (!tx_ref) {
      return NextResponse.json(
        { message: "Transaction reference is missing" },
        { status: 400 }
      );
    }

    // Define headers for the Chapa API request
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Make the request to Chapa to verify the transaction
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`, // Correct URL with tnx_ref
      header
    );

    const resp = response.data; // Get the response data from Chapa

    // Return success response with transaction details
    return NextResponse.json({
      message: "Payment verified successfully",
      status: "success",
      data: resp.data, // Pass the transaction data
    });
  } catch (error: any) {
    // Log and return any errors that occur
    console.error("Chapa verification error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error_code: error.code || "UNKNOWN_ERROR",
        message: error.response?.data.message || "Something went wrong during verification",
      },
      { status: error.response?.status || 400 }
    );
  }
}
