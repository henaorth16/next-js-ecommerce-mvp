/*
  Warnings:

  - You are about to drop the column `purchasedProdictIs` on the `Order` table. All the data in the column will be lost.
  - Added the required column `purchasedProdictId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "purchasedProdictIs",
ADD COLUMN     "purchasedProdictId" TEXT NOT NULL;
