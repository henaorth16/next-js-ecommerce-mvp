import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Convert to async POST function for Next.js App Router
export async function POST(req: NextRequest) {
  try {
    // Parse the body from the request
    const {
      productId,
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      customization,
    } = await req.json();

    // Validate request data
    if (!amount || !currency || !email || !tx_ref) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Chapa API headers with Authorization
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Prepare request body for Chapa
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success/${productId}`,
      "customization[title]": customization?.title || 'Default Title',
      "customization[description]": customization?.description || 'Payment description',
    };

    // Send the request to Chapa's initialize transaction endpoint
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      header
    );

    // Return success response to the client
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error Response Data:", error.response?.data);
    console.error("Error Status Code:", error.response?.status);
    console.error("Error Message:", error.message);

    return NextResponse.json(
      {
        message: "Payment initialization failed",
        error: error.response?.data || error.message,
      },
      { status: error.response?.status || 400 }
    );
  }
}
