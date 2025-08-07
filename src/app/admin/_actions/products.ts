"use server";
import { Product } from "@prisma/client";

import db from "@/db/db";
import { string, z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

function uploadToCloudinary(fileBuffer: Buffer, publicId: string): unknown {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products", // Customize folder in Cloudinary if necessary
        public_id: publicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    // Write the buffer to the upload stream
    uploadStream.end(fileBuffer);
  });
}

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  // file: fileSchema.refine((file) => file.size > 0, "Required"),
  isForMerchant: z.boolean().default(false), // New field for merchant products
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const result = addSchema.safeParse({
    ...rawData,
    isForMerchant: rawData.isForMerchant === "on", // convert checkbox value to boolean
    priceInCents: Number(rawData.priceInCents), // ensure price is a number
    image: formData.get("image"), // file needs to be reattached
  });
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Upload image to Cloudinary
  const imageBuffer = Buffer.from(await data.image.arrayBuffer());
  const publicId = `${crypto.randomUUID()}-${data.image.name}`;

  let imageUploadResult: unknown;
  try {
    imageUploadResult = await uploadToCloudinary(imageBuffer, publicId);
  } catch (error: any) {
    throw new Error(`Image upload error: ${error.message}`);
  }

  const { secure_url } = imageUploadResult as { secure_url: string };

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath: secure_url, // Cloudinary image URL
      isForMerchant: data.isForMerchant,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  // let filePath = product.filePath;
  // if (data.file != null && data.file.size > 0) {
  //   await fs.unlink(product.filePath);
  //   filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  //   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  // }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      // filePath,
      imagePath,
      isForMerchant: data.isForMerchant, // Update the isForMerchant field
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}
