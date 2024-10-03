import { Nav, NavLink } from "@/components/Nav"
import Navigation from "@/components/Navigation"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <div className="container my-6">{children}</div>
    </>
  )
}


