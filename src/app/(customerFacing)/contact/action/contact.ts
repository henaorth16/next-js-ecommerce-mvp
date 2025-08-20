"use server"

import db from "../../../../db/db"
import { z } from "zod"

 const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
})





export async function submitContact(formData: FormData) {
  // Extract values
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")
  
  // Validate
  const parsed = contactSchema.safeParse({ name, email, message })
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await db.message.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: { db: ["Something went wrong. Please try again."] } }
  }
}
