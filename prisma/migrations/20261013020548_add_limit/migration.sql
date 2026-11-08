-- AlterTable
ALTER TABLE "login_histories" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "LoginLimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blockTime" TIMESTAMP(3) NOT NULL,
    "totalTry" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LoginLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginLimit_userId_key" ON "LoginLimit"("userId");

-- AddForeignKey
ALTER TABLE "LoginLimit" ADD CONSTRAINT "LoginLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
