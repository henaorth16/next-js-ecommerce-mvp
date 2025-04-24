"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { LogInIcon, Search, ShoppingBag } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import Logo from "./Logo"
import { Input } from "./ui/input"
import { useAuth } from "@clerk/nextjs"
import { useClerk } from "@clerk/nextjs"
import { CartIcon } from "./CartIcon"
import { AddToCartButton } from "./AddToCartButton"


const links = [
  {
    title: "HOME",
    link: "/"
  },
  {
    title: "PRODUCTS",
    link: "/products"
  },
  {
    title: "MY ORDERS",
    link: "/orders"
  },
  {
    title: "CONTACT",
    link: "/contact"
  },
]
export default function Navigation() {
  const clerk = useClerk()
  const { isSignedIn, user, isLoaded, } = useUser()
  const pathname = usePathname()
  return (
    <header className="flex h-20 w-full shrink-0 lg:bg-background top-0 z-[9] items-center px-4 md:px-6 font-jost justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="z-[999] lg:hidden">
            <MenuIcon className="h-6 w-6 fixed" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        
        <div className="ml-8 absolute left-6 lg:hidden">
          <Logo/>
          </div>
          <div className="ml-8 absolute right-8 lg:hidden">
          <CartIcon/>
          </div>
        <SheetContent side="left">
          {/* {logo */}
          

          <div className="grid gap-2 py-6">
            {links.map((item, idx) => (
              <Link href={item.link} key={idx} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <NavigationMenu className="hidden max-w-full px-12 lg:flex flex-1 justify-between">
        <div className="flex gap-6">
          <Link href="/" className="flex justify-center items-center" prefetch={false}>
            {/* <Image src={logo} alt="logo" width={500} height={500}/>
              <span className="sr-only">Acme Inc</span> */}
            <Logo />
          </Link>
          <NavigationMenuList className="w-auto">
            {links.map((item, idx) => (
              <NavigationMenuLink asChild key={idx}>
                <Link
                  href={item.link}
                  className={`group inline-flex h-9 w-max text-[15px] items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none
                  ${pathname === item.link && "font-[800] underline underline-offset-4"}
                  data-[active]:bg-gray-400 data-[state=open]:bg-gray-400`}
                  prefetch={false}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </div>

        {/* //search bar and icons */}
        <div className="flex gap-3 items-center">
          
          <div className="search relative">
            <Input className="rounded-lg px-4 shadow-lg min-w-[300px]" type="search" name="search" id="search" placeholder="search" />
            <Search className="absolute right-2 top-1/2 text-muted-foreground -translate-y-1/2 " />
          </div>
          {/* <ShoppingBag className="mx-3 cursor-pointer"/> */}
          <CartIcon/>
          {isLoaded ? (
            isSignedIn ? (
              <div className="flex px-3">
                {<UserButton />}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-3 px-3">
                <LogInIcon className="cursor-pointer" aria-label="Login" onClick={() => clerk.openSignIn({})} />
              </div>
            )
          ) : ""}
        </div>
      </NavigationMenu>

    </header>
  )
}

function MenuIcon(props: any) {
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
