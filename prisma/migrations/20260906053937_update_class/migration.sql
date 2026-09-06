/*
  Warnings:

  - You are about to drop the column `type` on the `Unload` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Unload_type_idx";

-- AlterTable
ALTER TABLE "Unload" DROP COLUMN "type";

-- DropEnum
DROP TYPE "UnloadType";
