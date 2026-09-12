-- CreateTable
CREATE TABLE "HelpLine" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "HelpLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YoutubeLink" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "YoutubeLink_pkey" PRIMARY KEY ("id")
);
