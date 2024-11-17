"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode, ComponentProps, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CardBtnProps {
   link: string;
   children: ReactNode;
   className?: string;
   buttonProps?: Omit<ComponentProps<typeof Button>, "className">;
}

export default function CardBtn({ link, children, className, buttonProps }: CardBtnProps) {
   const [isPending, startTransition] = useTransition();

   return (
      <WrapBtn {...buttonProps} className={className} onClick={() => startTransition(() => { })}>
         <Link href={link} className="w-full">
            {isPending ? (
               <Loader2 className="animate-spin ml-3 w-4 h-4 flex items-center" />
            ) : (
               children
            )}
         </Link>
      </WrapBtn>
   );
}


function WrapBtn({
   children,
   className,
   ...props
}: Omit<ComponentProps<typeof Button>, "className"> & { className?: string }) {
   return (
      <Button
         asChild
         {...props}
         className={cn("text-black py-2 text-md font-semibold", className)}
      >
         {children}
      </Button>
   );
}
