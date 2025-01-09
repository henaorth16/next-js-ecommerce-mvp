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
    <div className="flex flex-col mx-5 my-5 md:my-0 md:mx-3 h-auto rounded-sm group">
      <div className="relative w-full h-[25rem] md:h-[20rem] border-2 border-orange-500 rounded-lg overflow-hidden">
        <Link
          className="w-full inline-block rounded-lg overflow-hidden"
          href={`/products/details/${id}`}
        >
          <Image
            className="object-cover hover:scale-105 absolute top-0 left-0 w-full h-full transition-transform duration-300"
            src={imagePath}
            fill
            alt={name}
          />
        </Link>
        
        <HeartIcon
          className="absolute top-3 right-3 cursor-pointer size-9 text-orangeClr hover:bg-orange-600 hover:bg-opacity-50 p-2 rounded-full"
          aria-label="Like"
        />
      </div>
      <div className="relative px-3 py-2 flex justify-between items-center bg-gray-100 rounded-b-lg">
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-blueClr">{name}</h2>
          <p className="text-sm sm:text-md text-blueClr">Running Clothe</p>
        </div>
        <ShoppingCartIcon
          className="absolute -top-7 right-0 translate-x-1/4 z-[900] text-white cursor-pointer size-9 bg-orangeClr p-2 rounded-lg hover:scale-105 shadow-lg"
        />
        <p className="text-sm sm:text-md text-primary font-medium">
          {formatCurrency(priceInCents / 100)}
        </p>
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
