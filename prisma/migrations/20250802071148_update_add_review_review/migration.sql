-- CreateEnum
CREATE TYPE "public"."TipeFavorit" AS ENUM ('DESTINASI', 'JEEP', 'RESTORAN', 'VILLA');

-- CreateEnum
CREATE TYPE "public"."TipeUlasan" AS ENUM ('DESTINASI', 'JEEP', 'RESTORAN', 'VILLA');

-- CreateTable
CREATE TABLE "public"."Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipe" "public"."TipeFavorit" NOT NULL,
    "destinasiId" TEXT,
    "jeepTourId" TEXT,
    "villaId" TEXT,
    "restoranId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipe" "public"."TipeUlasan" NOT NULL,
    "nilai" INTEGER NOT NULL,
    "komentar" TEXT,
    "destinasiId" TEXT,
    "jeepTourId" TEXT,
    "villaId" TEXT,
    "restoranId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Favorite_userId_tipe_idx" ON "public"."Favorite"("userId", "tipe");

-- CreateIndex
CREATE INDEX "Review_userId_tipe_idx" ON "public"."Review"("userId", "tipe");

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "public"."Destinasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_jeepTourId_fkey" FOREIGN KEY ("jeepTourId") REFERENCES "public"."JeepTour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "public"."Villa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_restoranId_fkey" FOREIGN KEY ("restoranId") REFERENCES "public"."Restoran"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "public"."Destinasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_jeepTourId_fkey" FOREIGN KEY ("jeepTourId") REFERENCES "public"."JeepTour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "public"."Villa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_restoranId_fkey" FOREIGN KEY ("restoranId") REFERENCES "public"."Restoran"("id") ON DELETE SET NULL ON UPDATE CASCADE;
