/*
  Warnings:

  - A unique constraint covering the columns `[depositAddress]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "depositAddress" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_depositAddress_key" ON "Wallet"("depositAddress");
