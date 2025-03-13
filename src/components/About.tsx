"use client"
import {  HomeIcon, SmileIcon, Truck, Wallet } from "lucide-react"

const datas = [
  {
    icon: <HomeIcon  className="sm:mx-0 mx-auto"/>,
    title: "Original products",
    body: "We provide money back guarantee if the product are not original",
  },
  {
    icon: <SmileIcon  className="sm:mx-0 mx-auto"/>,
    title: "Original products",
    body: "We provide money back guarantee if the product are not original",
  },
  {
    icon: <Wallet  className="sm:mx-0 mx-auto"/>,
    title: "Original products",
    body: "We provide money back guarantee if the product are not original",
  },
  {
    icon: <Truck  className="sm:mx-0 mx-auto"/>,
    title: "Original products",
    body: "We provide money back guarantee if the product are not original",
  },
]

export default function About() {
 
  return (
    <div className="w-full gap-1 sm:px-10 flex-wrap sm:flex-nowrap mx-auto ">
      <div className="flex text-left  my-4 md:w-[80%] w-[95%] mx-auto justify-center">
        <h2 className="md:text-3xl text-lg font-bold">We provide best customer experiences.</h2>
        {/* <h2 className="text-4xl md:text-5xl font-normal tracking-tighter lg:text-5xl  bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              We help startups to grow and make money
            </h2> */}
        <p className="border-0 p-4 border-l-2 border-l-gray-800">We ensure our customers have the best shopping experience</p>
      </div>
      <div className="sm:w-[80%] mx-auto md:w-[90%] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-baseline">

        {datas.map((i, idx) => (
          <div key={idx} className=" border-b-2 p-3 w-auto text-center sm:text-left ">
            <span className="text-center w-fit">{i.icon}</span>
            <h3 className="my-2 font-bold text-lg">{i.title}</h3>
            <p>{i.body}</p>
          </div>
        ))}
      </div>

    </div>
  )

}
