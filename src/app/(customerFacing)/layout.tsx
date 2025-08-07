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
      {/**  //TODO: height limitaion may affect the ui  **/}
      <div className="min-h-[screen]">{children}</div>
      <Footer/>
    </>
  )
}


