/*
  Warnings:

  - The primary key for the `carrents` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "carrents" DROP CONSTRAINT "carrents_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "carrents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "carrents_id_seq";
