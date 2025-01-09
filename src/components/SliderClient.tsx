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
import { ProductCard } from "./ProductCard";

type SliderClientProps = {
  products: Product[];
};

function SliderClient({ products }: SliderClientProps) {
  let sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    VariableWidth: true,
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
    <div className="slider-container w-[94%] mx-auto px-4">
      <Slider ref={(slider: any) => (sliderRef = slider)} {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-4 mr-36 h-full">
            <ProductCard
              id={product.id}
              name={product.name}
              priceInCents={product.priceInCents}
              imagePath={product.imagePath}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderClient;