"use client"
import { AlignVerticalJustifyEndIcon, Facebook, FacebookIcon, GamepadIcon, HomeIcon, InstagramIcon, Link2Icon, LinkedinIcon, LinkIcon, LucideTableCellsMerge, Mail, Send, Twitter, Underline } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Footer() {
  return (
    <footer className='bg-primary text-background w-full  gap-5 p-8 md:px-16 sm:px-9 '>
      <section className='sm:flex mx-auto gap-4 sm:gap-1 md:flex-wrap  justify-around w-full'>
        <div className="info my-2">
          <Header text="Information" />
          <ul>
            <li>
              <a href="#">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#">
                Refund policy
              </a>
            </li>
            <li>
              <a href="#">
                Shipping & return
              </a>
            </li>
            <li>
              <a href="#">
                Terms & condition
              </a>
            </li>
          </ul>
        </div>
        <div className="quick my-2">
          <Header text="Quick link" />
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="store my-2">
          <Header text='Our store' />
          <ul className='flex flex-col '>
            <li><a href="https://maps.app.goo.gl/DjWhqoFMQrggkeFR9">Merkato - Addis ketema Hintsa</a></li>
            <li><a href="tel:+251911121889">+251911121889</a></li>
            <li><a href="#">+251912606343</a></li>
            <li><a href="#">+251929319660</a></li>
            <li><a href="#">info@solhabesha.com</a></li>
          </ul>
        </div>
        <div className="subscribe flex flex-col my-2 gap-2">
          <Header text="Subscribe our news letter" />
          <Input type='email' className='text-blueClr' placeholder='Email' />
          <Button className='bg-orangeClr h-1/6 hover:bg-muted-foreground'>Submit</Button>
        </div>
      </section>
      <div className='flex w-full md:px-14 mx-auto items-center justify-between my-7'>
        <Logo />
        <ul className='flex gap-3'>
          <li><a href="#"><Send /></a></li>
          <li><a href="#"><FacebookIcon /></a></li>
          <li><a href="#"><InstagramIcon /></a></li>
          <li><a href="#"><LinkedinIcon /></a></li>
          <li className='cursor-pointer' onClick={async() => {
             try {
              await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL as string);
              alert('you Copied a link');
            } catch (err) {
              console.error('Failed to copy: ', err);
            }
          } }><LinkIcon/></li>
        </ul>
      </div>
      <hr className='w-full my-2' />
      <p className='text-center text-muted-foreground'>© 2024 elites dev group, LTD - All Rights Reserved</p>
    </footer>
  )
}

function Header({ text }: { text: string }) {
  return <h2 className='text-lg font-semibold md:mb-2 mb-1'>{text}</h2>
}