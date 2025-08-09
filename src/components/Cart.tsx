"use client";
import type React from "react";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

export const Cart: React.FC = () => {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();
  return (
    <div>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <h2 className="text-primary">Cart</h2>
      <SheetContent>
        {cart.length === 0 ? (
          <div className="text-center h-full grid place-items-center">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mt-14">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center justify-center space-x-1">
                    <div onClick={() => {
                     router.push(`/products/details/${item.id}`);
                    }} className="w-20 h-20 mr-4 cursor-pointer">
                      <Image
                        className={`object-cover w-full h-full`}
                        src={item.imagePath}
                        width={80}
                        height={80}
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex  items-center space-x-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number.parseInt(e.target.value))
                      }
                      className="w-16 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2Icon className="text-red-600" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="font-semibold my-4">
              Total: ${getTotalPrice().toFixed(2)}
            </div>
            <div className="space-x-2 my-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button
                onClick={() => {
                  router.push(`/checkout`);
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
        
      </SheetContent>
    </div>
  );
};
