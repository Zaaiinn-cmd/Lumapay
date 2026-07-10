-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'PAYMENT';

-- CreateTable
CREATE TABLE "Deposit" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "txSignature" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "sender" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_txSignature_key" ON "Deposit"("txSignature");

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
