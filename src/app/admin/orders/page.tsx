import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import { PageHeader } from "../_components/PageHeader"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { DeleteDropDownItem } from "./_components/OrderActions"

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      first_name: true,
      email: true,
      last_name: true,
      tx_ref:true,
      createdAt: true,
      product: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}
 
export default function OrdersPage() {
  return (
    <>
      <PageHeader>Orders</PageHeader>
      <OrdersTable />
    </>
  )
}

async function OrdersTable() {
  const orders = await getOrders()

  if (orders.length === 0) return <p>No orders found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Customer name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead>transaction ref.</TableHead>
          <TableHead>date</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order,idx) => (
          <TableRow key={order.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.first_name} { order.last_name}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>
              {formatCurrency(order.pricePaidInCents / 100)}
            </TableCell>
            <TableCell>{order.tx_ref}</TableCell>
            <TableCell>{order.createdAt.toLocaleString()}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
