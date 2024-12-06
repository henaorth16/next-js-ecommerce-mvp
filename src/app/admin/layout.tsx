import { Nav, NavLink } from "@/components/Nav"
import { auth } from "@clerk/nextjs/server"

export const dynamic = "force-dynamic"
const {userId} = auth()
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if(userId !== process.env.ADMIN_ID){
    return(
      <p>you are not an admin!!😢</p>
    )
  }
  return (
    <>
    <section className="w-[90%] mx-auto">
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </section>
    </>
  )
}
