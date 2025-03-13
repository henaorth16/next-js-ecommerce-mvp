"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const { user } = useUser();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setCustomerInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          currency: "ETB",
          email: customerInfo.email,
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          phone_number: customerInfo.phone,
          tx_ref: `order-${Date.now()}`,
          cart: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.checkout_url) {
        clearCart();
        window.location.href = data.checkout_url;
      } else {
        console.error("Failed to create payment session", data.error);
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="font-semibold">Total: {getTotalPrice().toFixed(2)} ETB</div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutPage;
