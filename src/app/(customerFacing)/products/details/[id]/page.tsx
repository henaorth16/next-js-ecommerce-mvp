//@ts-nocheck
import React from "react"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"
import Link from "next/link"

export default async function page({ params: { id } }: { params: { id: string } }) {
  // const id = "65378675"
  const product = await db.product.findUnique({ where: { id } })

  return (
    <>
      <div className="w-4/5 bg-slate-100 mx-auto my-4 md:flex">
        <div className="imageWrapper px-8 w-[50%] h-auto">
          <Image src={product?.imagePath} width={1500} height={1650} alt="image" />
        </div>
        <div className="px-8 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl my-2 font-semibold">{product?.name}</h2>
          <div className="price flex justify-between items-end my-3">
            <h2 className="text-2xl">{formatCurrency(product?.priceInCents / 100)}</h2>
            <h1 className="text-muted-foreground line-through">{formatCurrency((product?.priceInCents * 0.2 + product?.priceInCents) / 100)}</h1>
          </div>
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
          <p>{product?.description} and other lorum kind of Lorem ipsum dolor sit. Ut dolore fugiat sapiente dignissimos quae labore corporis, consectetur maxime. Autem, asperiores vel. Cumque, maiores dolore? Ipsa officia dolore perferendis obcaecati. Facere ad eius libero at aspernatur et laudantium quo velit inventore excepturi neque ullam reprehenderit architecto, ex obcaecati! Minus placeat ipsam optio earum amet quis perspiciatis rerum ducimus odit, laborum saepe. quam sunt laudantium ducimus vitae fuga atque.</p>
          <Link href={`/products/${id}/purchase`} >
            <Button className="w-full my-2">Purchase</Button>
          </Link>
        </div>
      </div>
      {/* <Recomended /> */}
    </>
  )
}
