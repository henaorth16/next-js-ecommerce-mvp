import { Product } from "@prisma/client";
import SliderClient from "./SliderClient";

async function SliderComponent({ products }: { products: () => Promise<Product[]> }) {
  const productList = await products();

  return <SliderClient products={productList} />;
}

export default SliderComponent;
