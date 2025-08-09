/*
  Warnings:

  - Added the required column `hargaRata` to the `Restoran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Restoran" ADD COLUMN     "fasilitas" TEXT,
ADD COLUMN     "hargaRata" INTEGER NOT NULL,
ADD COLUMN     "jamBuka" TEXT,
ADD COLUMN     "jamTutup" TEXT,
ADD COLUMN     "jenisMakanan" TEXT;
