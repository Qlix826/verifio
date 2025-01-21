-- AlterTable
ALTER TABLE "BackgroundCheckRequest" ADD COLUMN     "emailVerificationCode" TEXT,
ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3),
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "smsVerificationCode" TEXT,
ADD COLUMN     "smsVerificationExpires" TIMESTAMP(3);
