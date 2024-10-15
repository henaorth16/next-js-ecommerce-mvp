import { AlignVerticalJustifyEndIcon, Facebook, FacebookIcon, GamepadIcon, InstagramIcon, LucideTableCellsMerge, Underline } from 'lucide-react'
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
      <ul className="contact flex flex-col gap-2">
         <li><a href="#"><FacebookIcon/></a></li>
         <li><a href="#"><InstagramIcon/></a></li>
         <li><a href="#"><Underline/></a></li>
      </ul>
    </footer>
  )
}
