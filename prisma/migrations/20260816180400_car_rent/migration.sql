-- CreateTable
CREATE TABLE "carrents" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carrents_pkey" PRIMARY KEY ("id")
);
