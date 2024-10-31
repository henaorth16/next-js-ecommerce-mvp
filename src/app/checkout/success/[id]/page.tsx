"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import thankyou from "../../../../../public/asset/thankyou.webp";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

export default function SuccessPage({ params: { id } }: { params: { id: string } }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    const initialize = async () => {
      if (!user) return;

      try {
        await sendEmail(id, user.fullName || "Customer");
        
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while processing your order.");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [id, user]);

  async function sendEmail(productId: string, username: string) {
    try {
      const response = await axios.post("/api/send-email", {
        productId,
        username,
      });

      if (response.status === 200) {
        console.log("Email sent successfully");
        setEmailSent(true);
        setShowConfetti(true);
      } else {
        console.error("Failed to send email");
        setError("Something gone wrong")
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  if (!user) return <RedirectToSignIn />;


  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      {loading ? <Loader2 className="animation-spin text-3xl"/> :
        <div>
          <h1 className="text-2xl">Payment Succeeded</h1>
          <div className="w-[32rem] h-auto">
            <Image src={thankyou} alt="Thank you" height={300} width={500} />
          </div>
          {emailSent && <h2 className="text-xl mt-4">Check your email</h2>}
          {showConfetti && <Confetti recycle={false} />}
          <p>Your order was successful. Thank you, {user.firstName}!</p>
        </div>
      }
    </div>
  );
}
