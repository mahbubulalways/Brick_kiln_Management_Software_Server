/*
  Warnings:

  - A unique constraint covering the columns `[subdomain]` on the table `vatainformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subdomain` to the `vatainformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vatainformation" ADD COLUMN     "subdomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vatainformation_subdomain_key" ON "vatainformation"("subdomain");
