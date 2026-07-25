/*
  Warnings:

  - Added the required column `category` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('news', 'event');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "category" "ArticleCategory" NOT NULL DEFAULT 'news';
ALTER TABLE "articles" ALTER COLUMN "category" DROP DEFAULT;
