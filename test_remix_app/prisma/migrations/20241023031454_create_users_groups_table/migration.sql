-- CreateTable
CREATE TABLE "users_groups" (
    "id" SERIAL NOT NULL,
    "user" UUID NOT NULL,
    "group" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL DEFAULT '',
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID NOT NULL,

    CONSTRAINT "users_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_groups_user_group_idx" ON "users_groups"("user", "group");

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_fkey" FOREIGN KEY ("group") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
