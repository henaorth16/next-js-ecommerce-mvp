"use client"
import React from 'react'
import { Button } from './ui/button'

export default function ContactForm() {
  return (
    <form className="w-full" action="post">
            <caption className="text-xl w-full text-start font-bold my-4">
              Send a message
            </caption>
            <div className="flex flex-col gap-2 md:px-4 px-2">
              <label className="text-gray-800 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 border border-gray-300 rounded"
              />
              <label className="text-gray-800 font-semibold pt-3">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label className="text-gray-800 font-semibold pt-3">
                Message
              </label>
              <textarea
                rows={Number("1")}
                placeholder="Your message here"
                className="p-2 border border-gray-300 rounded h-32"
              ></textarea>
              <Button
                type="submit"
                className="text-black bg-orangeClr hover:bg-orange-600 p-2 rounded-full my-2 md:w-1/3 transition-colors"
              >
                Send Message
              </Button>
            </div>
          </form>
  )
}

