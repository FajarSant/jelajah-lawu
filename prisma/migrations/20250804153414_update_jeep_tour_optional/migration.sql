/*
  Warnings:

  - Added the required column `durasi` to the `JeepTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gambarUrl` to the `JeepTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kapasitas` to the `JeepTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rute` to the `JeepTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."JeepTour" ADD COLUMN     "durasi" INTEGER NOT NULL,
ADD COLUMN     "fasilitas" TEXT,
ADD COLUMN     "gambarUrl" TEXT NOT NULL,
ADD COLUMN     "kapasitas" INTEGER NOT NULL,
ADD COLUMN     "rute" TEXT NOT NULL;
