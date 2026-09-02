-- CreateTable
CREATE TABLE "GoodsIssueBack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,
    "lost" INTEGER NOT NULL,
    "okay" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "goodId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsIssueBack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoodsIssueBack" ADD CONSTRAINT "GoodsIssueBack_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
