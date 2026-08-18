/*
  Warnings:

  - You are about to drop the column `linkOe` on the `Weather` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "linkOe",
ADD COLUMN     "linkOne" TEXT;
