"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { ButtonOutLine } from "./Logo";

const images = [
  "https://res.cloudinary.com/dhyfvvz23/image/upload/v1753916393/jpeg_hr0tjx.jpg",
  "https://res.cloudinary.com/dhyfvvz23/image/upload/v1753916379/Shewa_Amhara_zrlzdv.jpg",
  "https://res.cloudinary.com/dhyfvvz23/image/upload/v1753916679/Traditional_Wedding_Cloth_hpab9h.jpg",
]
const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full h-screen relative">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <h1 className="mainqoute text-5xl md:text-7xl text-white font-amharic">“በውኃ ይለቅ”</h1>
              <div className='ml-4'>
                 <p className='max-w-md my-4 md:text-lg text-center font-amharic text-white font-600'>ለጅምላና ልዩ ትእዛዝ የምትፈልጉ ይዘዙን በፍጥነት እናደርሳለን።</p>
                 
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
