-- CreateTable
CREATE TABLE "Unload" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "classId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unload" ADD CONSTRAINT "Unload_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
