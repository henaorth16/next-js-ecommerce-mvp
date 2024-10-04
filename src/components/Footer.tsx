import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-primary text-background flex flex-1 w-full justify-around items-center gap-5 p-12'>
      <div className="links flex flex-col">
         <Link href="#">Home</Link>
         <a href="#">About</a>
         <a href="#">Products</a>
         <a href="#">Contact</a>
      </div>
      <div className="contact flex flex-col">
         <a href="#">Facebook</a>
         <a href="#">Telegram</a>
         <a href="#">Instagram</a>
         <a href="#">Email</a>
      </div>
    </footer>
  )
}
