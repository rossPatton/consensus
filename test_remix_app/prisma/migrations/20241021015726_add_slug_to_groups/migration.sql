-- AlterTable
ALTER TABLE "groups" 
ADD COLUMN "slug" VARCHAR(255) NOT NULL DEFAULT '',
ALTER COLUMN "memberName" SET DEFAULT 'member',
ALTER COLUMN "modName" SET DEFAULT 'facilitator';
