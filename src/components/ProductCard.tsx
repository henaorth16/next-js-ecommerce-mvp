"use client"
import { formatCurrency } from "@/lib/formatters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { HeartIcon, ShoppingCartIcon } from "lucide-react"

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export function ProductCard({
  id,
  name,
  priceInCents,
  imagePath,
}: ProductCardProps) {
  return (
      <div className="flex  h-auto mx-auto flex-col rounded-sm group">
          <div className="relative">
            <Link className="w-full mx-auto md:h-[300px] max-h-[380px] md:max-w-[250px] rounded-lg overflow-hidden block border-2 border-orange-500" href={`/products/details/${id}`}>
              <Image className="object-cover hover:scale-110 transition-transform" src={imagePath} width={400} height={500} alt={name} />
            </Link>
            <ShoppingCartIcon className="absolute bottom-0 right-0 text-white cursor-pointer size-9 bg-orangeClr p-2 rounded-lg translate-x-1/4 translate-y-1/4 z-20" />
            <HeartIcon 
              className="absolute focus-within:fill-orange-600 right-2 top-2 cursor-pointer text-orangeClr size-9 hover:bg-orange-600 hover:bg-opacity-20 p-2 rounded-lg z-20" 
              aria-label="Like"
            />
        </div>
        <div className="px-2 py-1 flex justify-between items-center group-hover:bg-gray-200 rounded-t-0 rounded-b-lg">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-blueClr">{name}</h2>
            <p className="text-sm text-blueClr">Running Clothe</p>
          </div>
            <p className="text-md text-primary font-normal">{formatCurrency(priceInCents / 100)}</p>
        </div>
      </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-[4/5] bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}
