-- AlterTable
ALTER TABLE "BackgroundCheckRequest" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "consent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainAddress" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "secondaryAddress" TEXT;
