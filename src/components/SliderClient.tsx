"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";

type SliderClientProps = {
  products: Product[];
};

function SliderClient({ products }: SliderClientProps) {
  let sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container w-full px-4">
      <Slider ref={(slider: any) => (sliderRef = slider)} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-4 h-full">
            <Card className="overflow-hidden w-[90%]">
              <CardHeader className="p-0">
                <div className="relative h-56 object-cover">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>
                  {formatCurrency(product.priceInCents / 100)}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <span className={`text-sm ${product.isAvailableForPurchase ? 'text-green-500' : 'text-red-500'}`}>
                  {product.isAvailableForPurchase ? 'In Stock' : 'Out of Stock'}
                </span>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderClient;