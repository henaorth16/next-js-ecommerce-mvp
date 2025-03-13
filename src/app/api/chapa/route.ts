import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import db from "@/db/db";

// Convert to async POST function for Next.js App Router
export async function POST(req: NextRequest) {
  try {
    // Parse the body from the request
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      cart,
    } = await req.json();

    // Validate request data
    if (!amount || !currency || !email || !tx_ref || !cart.length) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Chapa API headers with Authorization
    const headers = {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    // Prepare request body for Chapa
    const body = {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success/${tx_ref}`,
      customization: {
        title: "Order Payment",
        description: "Payment for selected items",
      },
    };

    // Send the request to Chapa's initialize transaction endpoint
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      { headers }
    );

    if (response.data.status === "success") {
      // Save the order details to your database
      await db.order.create({
        data: {
          txRef: tx_ref,
          status: "PENDING",
          amount,
          customerEmail: email,
          customerName: `${first_name} ${last_name}`,
          customerPhone: phone_number,
          items: {
            create: cart.map((item: any) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      return NextResponse.json(
        { checkout_url: response.data.data.checkout_url },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to create payment session" },
        { status: 400 }
      );
    }
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
