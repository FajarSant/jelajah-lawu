-- AlterTable
ALTER TABLE "public"."Restoran" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
