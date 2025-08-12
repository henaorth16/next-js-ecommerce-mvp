import type React from "react";
import { useCartStore } from "@/lib/useCartStore";
import { Button } from "@/components/ui/button";
import { Check, Minus, Plus, ShoppingCartIcon } from "lucide-react";

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
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cartItem = useCartStore((state) =>
    state.cart.find((item) => item.id === product.id)
  );

  if (isAdded && cartItem) {
    return (
      <div className="absolute -right-4 -top-6 bg-slate-100 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => decreaseQuantity(product.id)}
        >
          <Minus size={16} />
        </Button>
        <span className="text-sm font-medium p-3">{cartItem.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => increaseQuantity(product.id)}
        >
          <Plus size={16} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      title="Add to cart"
      className="absolute -right-4 -top-6 bg-orangeClr hover:bg-orange-600 transition-colors duration-300"
      onClick={() => addToCart(product)}
    >
      <ShoppingCartIcon />
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
