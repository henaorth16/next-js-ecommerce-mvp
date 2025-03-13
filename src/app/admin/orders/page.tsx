import db from "@/db/db"
import { OrdersTable } from "./orders-tables"

export const dynamic = "force-dynamic"

async function getOrders() {
  try {
    const orders = await db.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return orders
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return []
  }
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  )
}

