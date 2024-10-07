"use client"
import React, {useState, useEffect} from 'react'


export default function Hero() {
   const [top, setTop] = useState(0)
   useEffect(() => {
   
  
      window.addEventListener("scroll", () => setTop(window.scrollY));
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener("scroll",  () => setTop(window.scrollY));
      };
    }, []);

   return (
      <div className="hero h-[75vh] w-full flex items-center justify-center pl-12 bg-gray-900 bg-[url(https://i.pinimg.com/736x/b3/1b/ac/b31bacd3544ea9e4964fc6f5146f4e5e.jpg)] bg-cover bg-no-repeat bg-fixed bg-blend-overlay"
       style={{backgroundPosition: `right 50% top ${top * 0.36}%`}}
      >
         <div className="leading-tight animated-text text-5xl font-jost text-center font-light text-white">
            <h1>Looking for</h1>
            <h1 className="">Your #1 Design?</h1>
         </div>
      </div>
   )
}
