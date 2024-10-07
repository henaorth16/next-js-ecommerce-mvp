"use client"
import { Button } from "./ui/button"


export default function About() {
  const imgUrl = "https://i.pinimg.com/474x/8f/34/f3/8f34f3d5d913364b48abc0b308479655.jpg"
  const imgUrl2 = "https://i.pinimg.com/736x/fe/f7/8d/fef78d33dc42a5a5154cb1f7c60a6c58.jpg"
  return (
    <main className="w-5/6  font-poppins mx-auto my-4 mt-12 h-auto ">
      <h1 className="text-3xl my-6">About__</h1>
      <div className="bg-slate-100 md:p-4 mb-4 md:mb-0 flex md:flex-row flex-col-reverse gap-12">
        <div className="md:w-3/5 flex flex-col justify-center gap-2">
          <h1 className="text-5xl font-light">Why You Have to Choose Us ?</h1>
          <p className="my-4 leading-7 text-center md:text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum reiciendis aut incidunt esse dolorum quaerat voluptate, harum voluptates quia vero aspernatur. Autem illo dolor placeat nulla rerum nobis ducimus, exercitationem sint voluptatibus qui explicabo in expedita molestias, reiciendis maiores animi soluta eligendi nesciunt cum quae. Sint hic quas quidem praesentium!</p>
          <Button className="w-full">Contact</Button>
        </div>
        <div className="imag overflow-hidden ">
          <img className="w-full aspect-[3/4]"
           src={imgUrl} alt="image" 
           />
        </div>
      </div>
      <div className="bg-slate-100 md:p-4 md:flex gap-12">
        <div className="imag ">
          <img className="w-full aspect-[3/4]" src={imgUrl2} alt="image" />
        </div>
        <div className="md:w-4/5 flex flex-col justify-center gap-2">
          <h1 className="text-5xl font-light">Various catagories..</h1>
          <p className="my-4 leading-7 text-center md:text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum reiciendis aut incidunt esse dolorum quaerat voluptate, harum voluptates quia vero aspernatur. Autem illo dolor placeat nulla rerum nobis ducimus, exercitationem sint voluptatibus qui explicabo in expedita molestias, reiciendis maiores animi soluta eligendi nesciunt cum quae. Sint hic quas quidem praesentium!</p>
          <Button className="w-full">See our Goods</Button>
        </div>
      </div>
    </main>
  )
}
