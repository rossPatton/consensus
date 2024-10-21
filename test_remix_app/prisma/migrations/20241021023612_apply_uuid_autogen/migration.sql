-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "decisions" ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "category" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "meetings" ALTER COLUMN "category" DROP DEFAULT,
ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "rsvps" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();
