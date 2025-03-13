import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { amount: true },
    _count: true,
  })

  return {
    amount: (data._sum.amount || 0) / 100,
    numberOfSales: data._count,
  }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { amount: true },
    }),
  ])

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.amount || 0) / userCount / 100,
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return { activeCount, inactiveCount }
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Orders"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount * 100)}
        clr="hsl(9, 100%, 67%)"
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
        clr="hsl(109, 100%, 67%)"
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
        clr="hsl(209, 100%, 67%)"
      />
    </div>
  )
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
  clr: string
}

function DashboardCard({ title, subtitle, body, clr }: DashboardCardProps) {
  return (
    <Card style={{
      backgroundColor: clr,
    }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
