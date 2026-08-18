/*
  Warnings:

  - You are about to drop the column `link` on the `Weather` table. All the data in the column will be lost.
  - Added the required column `linkOe` to the `Weather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkTwo` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "link",
ADD COLUMN     "linkOe" TEXT NOT NULL,
ADD COLUMN     "linkTwo" TEXT NOT NULL;
