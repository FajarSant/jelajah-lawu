/*
  Warnings:

  - Added the required column `kapasitas` to the `Villa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Villa" ADD COLUMN     "fasilitas" TEXT,
ADD COLUMN     "kapasitas" INTEGER NOT NULL;
