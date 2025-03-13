"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Eye, MoreHorizontal, CheckCircle, Clock, XCircle, TruckIcon } from "lucide-react"
import { updateOrderStatus } from "@/app/admin/orders/actions"
import { useToast } from "@/hooks/use-toast"
type OrderItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  orderId: string
}

type Order = {
  id: string
  txRef: string
  status: string
  transactionId: string | null
  amount: number
  customerEmail: string
  customerName: string
  customerPhone: string | null
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500"
      case "PENDING":
        return "bg-yellow-500"
      case "FAILED":
        return "bg-red-500"
      case "DELIVERED":
        return "bg-blue-500"
      case "PROCESSING":
        return "bg-purple-500"
      case "SHIPPED":
        return "bg-indigo-500"
      case "CANCELLED":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="h-4 w-4 mr-2" />
      case "PENDING":
        return <Clock className="h-4 w-4 mr-2" />
      case "FAILED":
        return <XCircle className="h-4 w-4 mr-2" />
      case "DELIVERED":
        return <TruckIcon className="h-4 w-4 mr-2" />
      case "PROCESSING":
        return <Clock className="h-4 w-4 mr-2" />
      case "SHIPPED":
        return <TruckIcon className="h-4 w-4 mr-2" />
      case "CANCELLED":
        return <XCircle className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleStatusChange = async (orderId: string, status: string) => {
    setIsUpdating(orderId)

    try {
      // Optimistic UI update
      const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status } : order))

      const result = await updateOrderStatus({ orderId, status })

      if (result.success) {
        toast({
          title: "Status updated",
          description: `Order status changed to ${status}`,
        })
        // Force a refresh to get the updated data
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.txRef}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={isUpdating === order.id}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "PENDING")}
                          disabled={order.status === "PENDING"}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "PAID")}
                          disabled={order.status === "PAID"}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "PROCESSING")}
                          disabled={order.status === "PROCESSING"}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "SHIPPED")}
                          disabled={order.status === "SHIPPED"}
                        >
                          <TruckIcon className="h-4 w-4 mr-2" />
                          Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "DELIVERED")}
                          disabled={order.status === "DELIVERED"}
                        >
                          <TruckIcon className="h-4 w-4 mr-2" />
                          Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(order.id, "CANCELLED")}
                          disabled={order.status === "CANCELLED"}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p>
                    <span className="font-medium">Order ID:</span> {selectedOrder.txRef}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Status:</span>
                    <Badge className={`${getStatusColor(selectedOrder.status)} text-white flex items-center`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status}
                    </Badge>
                  </p>
                  <p>
                    <span className="font-medium">Transaction ID:</span> {selectedOrder.transactionId || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p>
                    <span className="font-medium">Name:</span> {selectedOrder.customerName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {selectedOrder.customerPhone || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id} className="hover:cursor-pointer hover:bg-slate-400" onClick={
                        () => router.push(`/products/details/${item.productId}`)
                      }>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-semibold">${selectedOrder.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      Change Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "PENDING")
                        setSelectedOrder({ ...selectedOrder, status: "PENDING" })
                      }}
                      disabled={selectedOrder.status === "PENDING"}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "PAID")
                        setSelectedOrder({ ...selectedOrder, status: "PAID" })
                      }}
                      disabled={selectedOrder.status === "PAID"}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "PROCESSING")
                        setSelectedOrder({ ...selectedOrder, status: "PROCESSING" })
                      }}
                      disabled={selectedOrder.status === "PROCESSING"}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "SHIPPED")
                        setSelectedOrder({ ...selectedOrder, status: "SHIPPED" })
                      }}
                      disabled={selectedOrder.status === "SHIPPED"}
                    >
                      <TruckIcon className="h-4 w-4 mr-2" />
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "DELIVERED")
                        setSelectedOrder({ ...selectedOrder, status: "DELIVERED" })
                      }}
                      disabled={selectedOrder.status === "DELIVERED"}
                    >
                      <TruckIcon className="h-4 w-4 mr-2" />
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, "CANCELLED")
                        setSelectedOrder({ ...selectedOrder, status: "CANCELLED" })
                      }}
                      disabled={selectedOrder.status === "CANCELLED"}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

