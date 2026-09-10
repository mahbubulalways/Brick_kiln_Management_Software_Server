-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "address" TEXT,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "rate" SET DEFAULT 0;
