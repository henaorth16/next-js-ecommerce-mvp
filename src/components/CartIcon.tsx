import type React from "react";
import { useCartStore } from "@/lib/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "./ui/sheet";
import { Cart } from "./Cart";
import { useEffect, useState } from "react";

export const CartIcon: React.FC = () => {
  const getTotalItems = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <div className="relative">
      {/* make the background out of the sheet dimmer */}
      <Sheet>
        <SheetTrigger>
          <ShoppingCart className="h-6 w-6" />
          {getTotalItems > 0 && (
         <span className="absolute -top-3 -right-3 bg-orangeClr text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
           {getTotalItems}
         </span>
          )}
        </SheetTrigger>
        <SheetOverlay className="bg-red-400" />
        {/* Add a custom overlay to dim the background more */}
        <SheetContent className="bg-white relative z-50">
          <Cart />
        </SheetContent>
      </Sheet>
    </div>
  );
};
