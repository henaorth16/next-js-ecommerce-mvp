import { Nav, NavLink } from "@/components/Nav"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
export const dynamic = "force-dynmic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <div className="min-h-[calc(100vh-15rem)]">{children}</div>
      <Footer/>
    </>
  )
}


