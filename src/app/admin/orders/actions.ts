"use server"

import { revalidatePath } from "next/cache"
import db from "@/db/db"

type UpdateOrderStatusProps = {
  orderId: string
  status: string
}

export async function updateOrderStatus({ orderId, status }: UpdateOrderStatusProps) {
  try {
    await db.order.update({
      where: { id: orderId },
      data: { status },
    })

    
    return { success: true, message: "Order status updated successfully" }
    // Revalidate the orders page to reflect the changes
    revalidatePath("/orders")
  } catch (error) {
    console.error("Failed to update order status:", error)
    return { success: false, message: "Failed to update order status" }
  }
}

