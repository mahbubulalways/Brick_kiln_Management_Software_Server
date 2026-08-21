/*
  Warnings:

  - You are about to drop the column `createdBy` on the `chllans` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `chllans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chllans" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
