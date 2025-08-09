import type React from "react";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCartIcon } from "lucide-react";

type AddToCartButtonProps = {
  product: {
    id: string;
    imagePath: string; // Optional for products without images
    name: string;
    price: number;
  };
  isAdded?: boolean;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  isAdded,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      title={isAdded ? "Already added to cart" : "Add to cart"}
      className={`absolute -right-4 -top-6 ${
        isAdded ? "bg-muted-foreground" : "bg-orangeClr hover:bg-orange-600"
      } z-10  transition-colors duration-300`}
      onClick={() => {
        addToCart(product);
      }}
    >
      {isAdded ? <Check /> : <ShoppingCartIcon />}
    </Button>
  );
};

export const AddToCartDetailButton: React.FC<AddToCartButtonProps> = ({
  product,
  isAdded,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      disabled={isAdded}
      onClick={() => addToCart(product)}
      className={`w-full ${
        isAdded ? "text-black bg-muted-foreground" : ""
      } z-10  transition-colors duration-300 mt-6`}
    >
     {isAdded ? <Check className="text-green-300"/> : "Add to Cart"}
    </Button>
  );
};
