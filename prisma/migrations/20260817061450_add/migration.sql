/*
  Warnings:

  - Added the required column `browser` to the `login_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "login_histories" ADD COLUMN     "browser" TEXT NOT NULL;
