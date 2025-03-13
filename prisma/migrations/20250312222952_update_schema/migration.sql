/*
  Warnings:

  - You are about to drop the column `currency` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `pricePaidInCents` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tx_ref` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[txRef]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txRef` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "currency",
DROP COLUMN "email",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "phone",
DROP COLUMN "pricePaidInCents",
DROP COLUMN "productId",
DROP COLUMN "reference",
DROP COLUMN "tx_ref",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT,
ADD COLUMN     "txRef" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "DownloadVerification_productId_idx" ON "DownloadVerification"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_txRef_key" ON "Order"("txRef");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
