/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SuitType" AS ENUM ('power', 'stealth', 'concealment');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SuperheroSuit" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" "SuitType" NOT NULL,
    "durability" INTEGER NOT NULL,
    "repairCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperheroSuit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperheroSuit_code_key" ON "SuperheroSuit"("code");

-- CreateIndex
CREATE INDEX "SuperheroSuit_code_idx" ON "SuperheroSuit"("code");
