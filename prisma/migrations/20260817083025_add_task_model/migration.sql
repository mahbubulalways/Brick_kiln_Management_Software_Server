-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('COMPLETE', 'PENDING');

-- CreateTable
CREATE TABLE "TaskManager" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repeat" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskManager" ADD CONSTRAINT "TaskManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
