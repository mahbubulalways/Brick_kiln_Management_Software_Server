-- CreateTable
CREATE TABLE "VataSmsSettings" (
    "id" TEXT NOT NULL,
    "newInvoice" BOOLEAN NOT NULL DEFAULT false,
    "updateInvoice" BOOLEAN NOT NULL DEFAULT false,
    "deleteInvoice" BOOLEAN NOT NULL DEFAULT false,
    "newDelivery" BOOLEAN NOT NULL DEFAULT false,
    "newDueCollection" BOOLEAN NOT NULL DEFAULT false,
    "deuCollectionUpdate" BOOLEAN NOT NULL DEFAULT false,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "VataSmsSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VataSmsSettings" ADD CONSTRAINT "VataSmsSettings_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
