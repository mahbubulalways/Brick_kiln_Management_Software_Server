/*
  Warnings:

  - Added the required column `carNo` to the `VataCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VataCar" ADD COLUMN     "carNo" TEXT NOT NULL;
