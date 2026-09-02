/*
  Warnings:

  - You are about to drop the column `description` on the `GoodHistoryLog` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `GoodHistoryLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoodHistoryLog" DROP COLUMN "description",
ADD COLUMN     "quantity" INTEGER NOT NULL;
