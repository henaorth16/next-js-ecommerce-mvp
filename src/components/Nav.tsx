"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode } from "react"


export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="grid gap-2 py-6 text-primary-foreground">
      {children}
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "flex w-full items-center py-2 text-lg font-semibold",
        pathname === props.href && "border-0 border-b-4 border-muted-primary"
      )}
    />
  )
}
