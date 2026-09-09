ALTER TABLE "Wallet"
  ALTER COLUMN "balance" TYPE DECIMAL(30, 6)
  USING "balance"::numeric;

ALTER TABLE "Transaction"
  ALTER COLUMN "amount" TYPE DECIMAL(30, 6)
  USING "amount"::numeric,
  ALTER COLUMN "fee" TYPE DECIMAL(30, 6)
  USING "fee"::numeric;

ALTER TABLE "Deposit"
  ALTER COLUMN "amount" TYPE DECIMAL(30, 6)
  USING "amount"::numeric;
