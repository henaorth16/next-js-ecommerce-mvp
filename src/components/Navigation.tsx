"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { MountainSnow, MountainSnowIcon, SunIcon } from "lucide-react"

const links = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "Products",
    link: "/products"
  },
  {
    title: "My Orders",
    link: "/orders"
  },
]
export default function Navigation() {
  const pathname = usePathname()
  return (
    <header className="flex h-20 w-full shrink-0 sticky top-0 z-[999] bg-slate-100 items-center px-4 md:px-6 font-jost">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          {/* {logo */}
          <Link href="/" prefetch={false}>
            <MountainSnowIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <div className="grid gap-2 py-6">
          {links.map((item, idx) => (
            <Link href={item.link} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              {item.title}
            </Link>
          ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainSnow className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">

        <NavigationMenuList>
          {links.map((item, idx) => (
            <NavigationMenuLink asChild>
            <Link
              href={item.link}
              className={`group inline-flex h-9 w-max text-md items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none
                ${pathname === item.link && "font-[800]"}
                data-[active]:bg-gray-400 data-[state=open]:bg-gray-400`}
              prefetch={false}
            >
              {item.title}
            </Link>
          </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
