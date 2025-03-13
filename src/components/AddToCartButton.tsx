import type React from "react"
import { useCartStore } from "@/lib/useCartStore"
import { Button } from "@/components/ui/button"
import { CartIcon } from "./CartIcon"
import { CarrotIcon, ShoppingCartIcon } from "lucide-react"

type AddToCartButtonProps = {
  product: {
    id: string
    name: string
    price: number
  }
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)

  return <Button title="Add to cart" className="absolute -right-4 -top-6 z- bg-orangeClr" onClick={() => addToCart(product)}><ShoppingCartIcon /></Button>
}

