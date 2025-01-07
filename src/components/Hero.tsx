"use client"
import React, {useState, useEffect, useRef} from 'react'
import { ButtonOutLine } from './Logo';
import heroImg from "../../public/asset/heroimg.png"
import Image from 'next/image';

export default function Hero() {
   const [top, setTop] = useState(0)
 
   useEffect(() => {
      window.addEventListener("scroll", () => setTop(window.scrollY));
        return () => {
        window.removeEventListener("scroll",  () => setTop(window.scrollY));
      };
    }, []);

    return (
      <section className="overflow-hidden h-[75vh] w-full bg-[linear-gradient(176deg,_var(--back-clr)_30%,_var(--orange-clr))] z-0 pl-12">
         <main className=' flex justify-around w-full h-full overflow-y-hidden'>
            <h1 className='absolute text-[19rem] -bottom-16 text-backClr z-[0] left-24'>01</h1>
            <div className='flex flex-col z-10 overflow-hidden '>
              <div className="p-3 shadow-[-12px_0px_0_var(--blue-clr)] m-3 mb-16">sol habesha cloth dustrubuter and designs <br/><span className='font-semibold'>{new Date().getFullYear()}</span></div>
              <h1 className="mainqoute text-7xl text-blueClr font-amharic">“በውኃ ይለቅ”</h1>
              <div className='ml-4'>
                 <p className='max-w-md my-4 text-lg font-amharic text-blueClr font-600'>ለጅምላና ልዩ ትእዛዝ የምትፈልጉ ይዘዙን በፍጥነት እናደርሳለን።</p>
                 <ButtonOutLine text="Shop now"/>
              </div>
            </div>
            <Image className='w-[300px] object-cover z-100 bg-transparent' src={heroImg}  alt="background image of carousel" />
         </main>
      </section>
    )
}
