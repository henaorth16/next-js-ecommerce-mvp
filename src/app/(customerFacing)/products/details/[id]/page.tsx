"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/useCartStore";
import { AddToCartDetailButton } from "@/components/AddToCartButton";

type Product = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const {cart, addToCart} = useCartStore();
  // const addToCart = useCartStore((state) => state.addToCart);
  const isAdded = cart.map(item => item.id === id).includes(true)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <p className="text-center text-gray-500 mt-10">
        No related product found.
      </p>
    );

  return (
    <div className="md:w-3/4 bg-slate-100 mx-auto my-4 md:flex md:justify-between">
      <div className="relative px-8 md:pl-0 w-full max-h-screen overflow-hidden md:w-[50%]">
        <Zoom>
          <Image
            className="mx-auto"
            src={product.imagePath}
            width={500}
            height={500}
            alt={product.name}
          />
        </Zoom>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-start">
        <h2 className="text-3xl my-2 uppercase font-semibold">
          {product.name}
        </h2>

        <div className="price flex justify-between items-end my-3">
          <h2 className="text-2xl">
            {formatCurrency(product.priceInCents / 100)}
          </h2>
          <h1 className="text-muted-foreground line-through">
            {formatCurrency((product.priceInCents * 1.2) / 100)}
          </h1>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground font-medium">Sizes:</p>
            <ToggleGroup type="multiple" className="bg-background rounded-md">
              <ToggleGroupItem value="S" aria-label="Toggle S">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="XS" disabled aria-label="Toggle XS">
                XS
              </ToggleGroupItem>
              <ToggleGroupItem value="L" disabled aria-label="Toggle L">
                L
              </ToggleGroupItem>
              <ToggleGroupItem value="XL" disabled aria-label="Toggle XL">
                XL
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground font-medium">
              Quantity:
            </p>
            <Input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </div>

        {product.description && (
          <p className="text-sm text-muted-foreground mb-6">
            {product.description}
          </p>
        )}

        <hr className="w-full my-4 bg-black" />

        <AddToCartDetailButton product={{id, imagePath: product.imagePath, name: product.name, price: product.priceInCents/100}} isAdded={isAdded}/>
      </div>
    </div>
  );
}
