"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode } from "react"
import {  useFormStatus } from "react-dom"

export default function MyOrdersPage() {
  return (
    <form action="iih" className="md:w-[80%] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history and
            download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" required name="email" id="email" />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton waiting="sending..." done="send" />
        </CardFooter>
      </Card>
    </form>
  )
}

function SubmitButton({waiting, done}: {waiting:ReactNode, done: ReactNode}) {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" size="lg" disabled={pending} type="submit">
      {pending ? waiting : done}
    </Button>
  )
}
