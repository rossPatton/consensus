-- CreateEnum
CREATE TYPE "membership_status" AS ENUM ('Pending', 'Active', 'Revoked');

-- AlterTable
ALTER TABLE "users_groups"
ADD COLUMN "status" "membership_status" NOT NULL DEFAULT 'Pending';
