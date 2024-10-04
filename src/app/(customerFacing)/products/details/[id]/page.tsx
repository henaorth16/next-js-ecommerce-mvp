import React from "react"
import db from "../../../../../db/db"

export default async function page({params}) {
   const {id} = params
   const product = await db.product.findUnique({ where: { id } })
   return (
    <div>
      <img src={product?.imagePath} alt="image" />
    </div>
  )
}
