import {
   Body,
   Container,
   Head,
   Heading,
   Html,
   Preview,
   Tailwind,
 } from "@react-email/components"
 type propType = {
   id:string
   username: string
 }
 
 export default function PurchaseReceiptEmail({
   id,
   username,
 }: propType) {
   return (
     <Html>
       <Preview>Download {username} and view receipt</Preview>
       <Tailwind>
         <Head />
         <Body className="font-sans bg-white">
           <Container className="max-w-xl">
             <Heading>Purchase Receipt</Heading>
           </Container>
         </Body>
       </Tailwind>
     </Html>
   )
 }