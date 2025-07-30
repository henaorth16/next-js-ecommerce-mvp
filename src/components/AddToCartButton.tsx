import type React from "react";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import {  Check, ShoppingCartIcon } from "lucide-react";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
  },
  isAdded?: boolean;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product, isAdded
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      title={isAdded ? "Already added to cart" : "Add to cart"}
      className={`absolute -right-4 -top-6 ${isAdded ? "bg-muted-foreground" : "bg-orangeClr hover:bg-orange-600"} z-10  transition-colors duration-300`}
      onClick={() => {
        addToCart(product);
      }}
    >
      {isAdded ? <Check/> : <ShoppingCartIcon />}
    </Button>
  );
};
