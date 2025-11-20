/*
  Warnings:

  - Changed the type of `serial` on the `chllans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "chllans" DROP COLUMN "serial",
ADD COLUMN     "serial" INTEGER NOT NULL;
