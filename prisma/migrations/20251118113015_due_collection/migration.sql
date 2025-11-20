-- CreateTable
CREATE TABLE "Due_Collection" (
    "id" SERIAL NOT NULL,
    "due" DOUBLE PRECISION NOT NULL,
    "collect" DOUBLE PRECISION NOT NULL,
    "newDue" DOUBLE PRECISION NOT NULL,
    "nextDate" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "challanId" INTEGER NOT NULL,

    CONSTRAINT "Due_Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Due_Collection" ADD CONSTRAINT "Due_Collection_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
