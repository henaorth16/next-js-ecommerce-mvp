import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Nav, NavLink } from "@/components/Nav"
import { currentUser } from "@clerk/nextjs/server";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) return notFound();


  // if (user?.emailAddresses[0]?.emailAddress !== "emyayehenok@gmail.com") {
  //   return notFound();
  // }

  return (
    <section className="w-[90%] mx-auto">
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </section>
  );
}
