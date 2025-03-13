import type React from "react"
import { useCartStore } from "@/lib/useCartStore"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Cart } from "./Cart"

export const CartIcon: React.FC = () => {
   const getTotalItems = useCartStore((state) => state.getTotalItems)

   return (
      <div className="relative">
         <Sheet>
            <SheetTrigger>
               <ShoppingCart className="h-6 w-6" />
               {getTotalItems() > 0 && (
                  <span className="absolute -top-3 -right-3 bg-orangeClr text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                     {getTotalItems()}
                  </span>
               )}
            </SheetTrigger>
            <SheetContent>
               <Cart />
            </SheetContent>
         </Sheet>
      </div>
   )
}

