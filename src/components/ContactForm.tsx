"use client"

import React, { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { submitContact } from "@/app/(customerFacing)/contact/action/contact"

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="w-full"
      action={(formData) =>
        startTransition(async () => {
          setErrors({})
          setSuccess(null)

          const res = await submitContact(formData)

          if (res.error) {
            setErrors(res.error)
          } else {
            setSuccess("Your message has been sent successfully!")
          }
        })
      }
    >
      <caption className="text-xl w-full text-start font-bold my-4">
        Send a message
      </caption>
      <div className="flex flex-col gap-2 md:px-4 px-2">
        <label className="text-gray-800 font-semibold">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

        <label className="text-gray-800 font-semibold pt-3">
          Email address
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

        <label className="text-gray-800 font-semibold pt-3">Message</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Your message here"
          className="p-2 border border-gray-300 rounded h-32"
        ></textarea>
        {errors.message && <p className="text-red-500">{errors.message[0]}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="text-black bg-orangeClr hover:bg-orange-600 p-2 rounded-full my-2 md:w-1/3 transition-colors"
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>

        {success && <p className="text-green-600 pb-3">{success}</p>}
        {errors.db && <p className="text-red-600 pb-3">{errors.db[0]}</p>}
      </div>
    </form>
  )
}
