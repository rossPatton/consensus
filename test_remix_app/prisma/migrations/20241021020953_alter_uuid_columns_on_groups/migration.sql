/*
  Warnings:

  - Made the column `uuid` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "category" DROP DEFAULT,
ALTER COLUMN "uuid" SET NOT NULL;