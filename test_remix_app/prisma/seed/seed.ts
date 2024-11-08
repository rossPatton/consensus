/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient, meeting_statusEnum, meeting_typesEnum } from "@snaplet/seed";
import { copycat, faker } from "@snaplet/copycat";
import { v7 } from "uuid";

import { categories as catsConst, meetingTypes } from "../../app/constants";
import { slugify } from "~/utils";
import { membership_status, rsvp_status, rsvp_type } from "@prisma/client";
import { db } from "~/utils/db.server";

async function main() {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const categoriesToSeed = catsConst.map(cat => ({
    ...cat,
    uuid: v7(),
  }));

  const { categories } = await seed.categories(categoriesToSeed);

  const testGroups = categoriesToSeed.map((cat) => ({
    "category": cat.uuid,
    "description": `Your local neighborhood test ${cat.display}.`,
    "name": `Test ${cat.display}`,
    "slug": `test_${cat.slug}`,
    uuid: v7(),
  }));

  const { groups } = await seed.groups(testGroups);
  const { users } = await seed.users(createMany => [
    {
      type: "admin",
      email: "ross_patton@pm.me",
      firstName: "Ross",
      lastName: "Patton",
      username: "tester",
      uuid: v7(),
    },
    ...createMany(100, ({ index }) => ({
      type: "member",
      email: copycat.email(index),
      firstName: copycat.firstName(index),
      lastName: copycat.lastName(index),
      username: copycat.username(index),
    })),
  ]);

  const meetings = new Array(100).fill(null).map((_, i) => {
    const title = faker.word.words({
      count: {
        min: 4,
        max: 10,
      },
    });
    const slug = slugify(title);

    return {
      category: copycat.oneOf(i, categories.map(cat => cat.uuid!)),
      group: copycat.oneOf(i, groups.map(group => group.uuid!)),
      host: users[0].uuid,
      description: copycat.paragraph(i, {
        min: 2,
        max: 5,
      }),
      duration: 60,
      img: "https://consensus.nyc3.cdn.digitaloceanspaces.com/meeting_images/PXL_20231211_122430891.PORTRAIT.jpg",
      locationLink: faker.internet.url(),
      slug,
      status: i % 10 === 0 ? "Draft" : "Public" as meeting_statusEnum,
      title,
      type: copycat.oneOf(i, meetingTypes as meeting_typesEnum[]),
    };
  });

  await seed.meetings(meetings);

  const dbUsers = await db.users.findMany();
  await seed.userMemberships(dbUsers.map(user => ({
    user: user.uuid,
    group: copycat.oneOf(user.uuid, groups.map(group => group.uuid!)),
    role: "member",
    status: copycat.oneOf(["Pending", "Active", "Revoked"]) as unknown as membership_status,
  })));

  const dbMeetings = await db.meetings.findMany();
  await seed.rSVPS(dbUsers.map(user => ({
    user: user.uuid,
    meeting: copycat.oneOf(user.uuid, dbMeetings.map(m => m.uuid)),
    type: copycat.oneOf(["private", "public"]) as unknown as rsvp_type,
    value: copycat.oneOf(["Yes", "No", "Maybe"]) as unknown as rsvp_status,
  })));

  console.log("Database seeded successfully!");
  process.exit();
};

main();
