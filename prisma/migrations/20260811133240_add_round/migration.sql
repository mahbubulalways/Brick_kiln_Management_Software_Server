/*
  Warnings:

  - Added the required column `round` to the `Unload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Unload" ADD COLUMN     "round" TEXT NOT NULL;
