import { Nav, NavLink } from "@/components/Nav"
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic"
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

 const user = await currentUser();
    if (!user || user.emailAddresses[0]?.emailAddress !== "emyayehenok@gmail.com") {
      return notFound();
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
