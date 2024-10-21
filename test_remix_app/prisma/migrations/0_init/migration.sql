-- CreateEnum
CREATE TYPE "meeting_status" AS ENUM ('Draft', 'Public', 'Private', 'Deleted');

-- CreateEnum
CREATE TYPE "meeting_types" AS ENUM ('Meeting', 'March', 'Rally', 'Direct Action', 'Protest', 'Strike', 'Picket', 'Vote', 'Election');

-- CreateEnum
CREATE TYPE "rsvp_status" AS ENUM ('Yes', 'No', 'Maybe');

-- CreateEnum
CREATE TYPE "rsvp_type" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "display" VARCHAR(255) NOT NULL DEFAULT '',
    "slug" VARCHAR(255) NOT NULL DEFAULT '',
    "uuid" UUID NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decisions" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "category" UUID NOT NULL DEFAULT '0192ab79-9d15-7217-9d8b-0899a54094fa'::uuid,
    "description" VARCHAR(1000) NOT NULL DEFAULT '',
    "memberName" VARCHAR(255) NOT NULL DEFAULT '',
    "modName" VARCHAR(255) NOT NULL DEFAULT '',
    "privacyType" VARCHAR(255) NOT NULL DEFAULT 'private',
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID,
    "name" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" UUID NOT NULL DEFAULT '0192ab79-9d15-7217-9d8b-0899a54094fa'::uuid,
    "description" VARCHAR(1000) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "group" UUID NOT NULL,
    "type" "meeting_types" NOT NULL DEFAULT 'Meeting',
    "location" VARCHAR(255) NOT NULL DEFAULT '',
    "locationLink" VARCHAR(255) NOT NULL DEFAULT '',
    "status" "meeting_status" NOT NULL DEFAULT 'Draft',
    "slug" VARCHAR(255) NOT NULL DEFAULT '',
    "datetime" TIMESTAMP(6) NOT NULL,
    "host" UUID NOT NULL,
    "duration" SMALLINT NOT NULL,
    "uuid" UUID NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvps" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "user" UUID NOT NULL,
    "meeting" UUID NOT NULL,
    "value" "rsvp_status" NOT NULL DEFAULT 'Yes',
    "type" "rsvp_type" NOT NULL DEFAULT 'private',
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT '',
    "uuid" UUID NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_uuid_idx" ON "categories"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "groups_uuid_idx" ON "groups"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "meetings_uuid_idx" ON "meetings"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_uuid_idx" ON "rsvps"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_idx" ON "users"("uuid");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_group_fkey" FOREIGN KEY ("group") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_host_fkey" FOREIGN KEY ("host") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_meeting_fkey" FOREIGN KEY ("meeting") REFERENCES "meetings"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

