"use client"
import React,{useEffect, useState} from "react"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import CardBtn from "@/components/cardButton"
import { useCartStore } from "@/lib/useCartStore"

export default function page({ params: { id } }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/product/${id}`)
      const data = await res.json()
      setProduct(data)
    }
    fetchData()
  })
  const addToCart = useCartStore((state) => state.addToCart)
  if (!product) return <p>No Related product found</p>

  // const product = await db.product.findUnique({ where: { id } })

  return (
    <>
      <div className="md:w-4/5 bg-slate-100 mx-auto my-4 md:flex">
        <div className="relative px-8 w-full md:w-[50%] md:h-auto ">
          <Image className="mx-auto" src={product?.imagePath} width={500} height={500} alt="image" />
        </div>
        <div className="px-8 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl my-2 uppercase font-semibold">{product?.name}</h2>
          <div className="price flex justify-between items-end my-3">
            <h2 className="text-2xl">{formatCurrency(product?.priceInCents / 100)}</h2>
            <h1 className="text-muted-foreground line-through">{formatCurrency((product?.priceInCents * 0.2 + product?.priceInCents) / 100)}</h1>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground font-medium">sizes:</p>
              <ToggleGroup type="multiple" className="bg-background rounded-md">
                <ToggleGroupItem className="font-bold" value="S" aria-label="Toggle S">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem disabled value="XS" aria-label="Toggle XS">
                  XS
                </ToggleGroupItem>
                <ToggleGroupItem disabled value="L" aria-label="Toggle L">
                  L
                </ToggleGroupItem>
                <ToggleGroupItem disabled value="XL" aria-label="Toggle XL">
                  XL
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground font-medium">Quantity:</p>
              <Input type="number" value={1} className="w-32" />
            </div>
          </div>


          <hr className="w-full my-4 bg-black" />


          <p>{product?.description} and other lorum kind of Lorem ipsum asperiores vel. Cumque, maiores dolore? Ipsa officia dolore perferendis obcaecati. Facere ad eius libero at aspernatur et laudantium quo velit inventore excepturi neque ullam reprehenderit architecto, ex obcaecati! Minus placeat ipsam optio earum amet quis perspiciatis rerum ducimus odit, laborum saepe. quam sunt laudantium ducimus vitae fuga atque.</p>
          <Button onClick={()=> addToCart({id:product.id,name:product.name,price:product.priceInCents/ 100})} className="w-full text-white mt-6">
            Add to Cart
          </Button>
        </div>
      </div>
      {/* <Recomended /> */}
    </>
  )
}
