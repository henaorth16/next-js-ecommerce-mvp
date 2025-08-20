import Image from "next/image";
import React from "react";
import img from "../../../../public/asset/conc.jpg";
import ContactForm from "@/components/ContactForm";

export default function contact() {
  return (
    <section className="w-full min-h-screen bg-gray-100">
      <div className="w-[85%] h-[160px] overflow-y-hidden mx-auto relative">
        <Image
          src={img}
          className="object-cover absolute top-0 left-0 w-full h-full"
          width={800}
          height={300}
          alt="habeshan dress image"
        />
      </div>
      <main className="w-full bg-gray-300 my-4 md:flex md:justify-evenly p-5 ">
        <div className="">
          <h1 className="text-2xl font-bold">GET IN TOUCH</h1>

          <div className="flex flex-col gap-2 pb-4">
            <div className="flex  gap-4 mt-4">
              <div className="rounded-full aspect-square flex justify-center items-center bg-orange-500 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pinned-icon lucide-map-pinned"
                >
                  <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
                  <circle cx="12" cy="8" r="2" />
                  <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
                </svg>
              </div>
              <div className="right">
                <h4 className="font-bold">Addresses</h4>
                <p className="text-muted-foreground">
                  Addis Ababa,
                  <br /> Merkato addis Ketema Bldg.
                </p>
              </div>
            </div>
            <div className="flex  gap-4 mt-4">
              <div className="rounded-full aspect-square flex justify-center items-center bg-orange-500 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-phone-icon lucide-phone"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </div>
              <div className="right">
                <h4 className="font-bold">Phone number</h4>
                <p className="text-muted-foreground">
                  <a href="tel:+251911121889" className="hover:underline">
                    +251-91-112-1889
                  </a>
                  <br />
                  <a href="tel:+251912606343" className="hover:underline">
                    +251-91-260-6343
                  </a>
                </p>
              </div>
            </div>
            <div className="flex  gap-4 mt-4">
              <div className="rounded-full aspect-square flex justify-center items-center bg-orange-500 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mail-icon lucide-mail"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div className="right">
                <h4 className="font-bold">E-mail</h4>
                <p className="text-muted-foreground">
                  Email us at:
                  <br />
                  <a href="mailto:solomon@gmail.com" className="hover:underline">solomon@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:w-[500px] px-6 bg-gray-100 rounded-md">
          <ContactForm />
        </div>
      </main>
    </section>
  );
}
