/*
  Warnings:

  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "news";

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "text" TEXT NOT NULL,
    "createdAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
