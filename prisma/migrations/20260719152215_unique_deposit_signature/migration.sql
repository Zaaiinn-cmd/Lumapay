/*
  Warnings:

  - You are about to drop the column `sender` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `txSignature` on the `Deposit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signature]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `signature` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Deposit_txSignature_key";

-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "sender",
DROP COLUMN "status",
DROP COLUMN "txSignature",
ADD COLUMN     "signature" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_signature_key" ON "Deposit"("signature");
