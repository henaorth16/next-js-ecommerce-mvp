import { Children } from "react";

export default function Layout({
   children,
 }: Readonly<{
   children: React.ReactNode
 }>){
   return <div className="min-h-screen flex justify-center items-center">
      {children}
   </div>
}