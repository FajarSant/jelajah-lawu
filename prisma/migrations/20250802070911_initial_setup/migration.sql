-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'VENDOR', 'PENGGUNA');

-- CreateEnum
CREATE TYPE "public"."JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "public"."StatusBooking" AS ENUM ('DIPROSES', 'DITUNDA', 'DIBAYAR', 'DITOLAK', 'DIBATALKAN', 'SELESAI');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "alamat" TEXT,
    "nomor_hp" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'PENGGUNA',
    "jenis_kelamin" "public"."JenisKelamin" NOT NULL DEFAULT 'LAINNYA',
    "tanggal_lahir" TIMESTAMP(3),
    "reset_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Destinasi" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JeepTour" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JeepTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Villa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Villa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Restoran" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restoran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."StatusBooking" NOT NULL DEFAULT 'DIPROSES',
    "totalHarga" INTEGER NOT NULL,
    "catatan" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destinasiId" TEXT,
    "jeepTourId" TEXT,
    "villaId" TEXT,
    "restoranId" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "public"."accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "public"."sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "public"."verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Destinasi" ADD CONSTRAINT "Destinasi_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JeepTour" ADD CONSTRAINT "JeepTour_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Villa" ADD CONSTRAINT "Villa_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Restoran" ADD CONSTRAINT "Restoran_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "public"."Destinasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_jeepTourId_fkey" FOREIGN KEY ("jeepTourId") REFERENCES "public"."JeepTour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "public"."Villa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_restoranId_fkey" FOREIGN KEY ("restoranId") REFERENCES "public"."Restoran"("id") ON DELETE SET NULL ON UPDATE CASCADE;
