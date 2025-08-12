import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache(() => {
  return db.product.findMany({
    where: { 
      isAvailableForPurchase: true
     },
     select: {
      id: true,
      name: true,
      priceInCents: true,
      imagePath: true,
     },
    orderBy: { name: "asc" },
  })
}, ["/products", "getProducts"])

export default function ProductsPage() {
  return <>
    <h1 className="text-3xl my-2 w-5/6 mx-auto ">Products</h1>
    <hr className="my-3"/>
    <div className="my-y-5 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  </>
  
}

async function ProductsSuspense() {
  const products = await getProducts()

  return products.map(product => <ProductCard key={product.id} {...product} />)
}
