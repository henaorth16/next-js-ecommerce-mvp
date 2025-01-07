"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';
import CardBtn from '@/components/cardButton';

type OrderSummaryProps = {
   product: {
      id:string,
      name:string,
      imagePath:string,
      priceInCents:number
   }
}

export default function OrderSummary({ product }: OrderSummaryProps) {
   return <>
     <section className='md:w-[31%]'>
       <Card className='p-4'>
         <CardHeader>
           <CardTitle>
             Order Summary
           </CardTitle>
         </CardHeader>
         <CardDescription>
           <div className='w-[100%] '>
             <img src={product?.imagePath} className='mx-auto max-w-full' alt="image" />
           </div>
           <div>
             <div className="flex w-full my-3 justify-between">
               <div className="col font-bold text-gray-800">Name:</div>
               <div className="col text-left">{product.name}</div>
             </div>
             <div className="flex w-full my-3 justify-between">
               <div className="col font-bold text-gray-800">Amount:</div>
               <div className="col text-left">{formatCurrency(product.priceInCents / 100)}</div>
             </div>
           </div>
         </CardDescription>
         <CardFooter className=''>
           <Input type='text' disabled placeholder='Discount Code (optional)' />
           <Button disabled>Apply</Button>
         </CardFooter>
         <CardBtn link={`/products/details/${product.id}`} className='text-gray-100'>See Details</CardBtn>
       </Card>
     </section>
   </>
 
 }