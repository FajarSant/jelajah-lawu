/*
  Warnings:

  - You are about to drop the column `nama` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "nama",
ADD COLUMN     "name" TEXT;
