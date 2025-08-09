"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import thankyou from "../../../../../public/asset/thankyou.webp";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function SuccessPage({ params: { id } }: { params: { id: string } }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get("ref"); // Retrieve transaction reference from URL

  const [showConfetti, setShowConfetti] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (thankyou) {
      setLoading(false);
      setShowConfetti(true);
    }
  }, [])

  // Verify the transaction upon component mount
  // useEffect(() => {
  //   const verifyTransaction = async () => {
  //     if (!tx_ref) {
  //       setError("Transaction reference is missing.");
  //       setLoading(false);
  //       return;
  //     }



  //     try {
  //       const response = await axios.post("/api/verify", { tx_ref });
  //       if (response.data.status === "success") {
  //         setShowConfetti(true);
  //         await sendEmail(id, username || "Customer");
  //         setEmailSent(true);
  //       } else {
  //         setError(`Transaction verification failed: ${response.data.message || 'Unknown error'}`);
  //       }
  //     } catch (verificationError: any) {
  //       console.error("Verification error:", verificationError);
  //       setError(verificationError.response?.data?.message || "An error occurred during transaction verification.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   verifyTransaction();
  // }, [tx_ref, id, user, isLoaded, isSignedIn]);


  // async function sendEmail(productId: string, username: string) {
  //   try {
  //     const response = await axios.post("/api/send-email", { productId, username });
  //     if (response.status === 200) {
  //       console.log("Email sent successfully");
  //       setEmailSent(true);
  //       setShowConfetti(true);
  //     } else {
  //       console.error("Failed to send email");
  //       setError("Something went wrong while sending your confirmation email.");
  //     }
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     setError("Failed to send confirmation email.");
  //   }
  // }


  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      {loading ? (
        <Loader2 className="animate-spin text-3xl" />
      ) : (
        <div>
          <h1 className="text-2xl">Payment Succeeded</h1>
          <div className="w-[32rem] h-auto">
            <Image className="animate-in" src={thankyou} alt="Thank you" height={300} width={500} />
          </div>
          {emailSent && <h2 className="text-xl mt-4">Check your email for details!</h2>}
          {showConfetti && <Confetti recycle={false} />}
          <p>Your order was successful. Thank you, {username}!</p>
          <Button variant="ghost"  onClick={() => router.push("/")} className="mt-4 text-orangeClr">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
