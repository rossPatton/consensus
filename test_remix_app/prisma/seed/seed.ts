/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient, meeting_statusEnum, meeting_typesEnum } from "@snaplet/seed";
import { copycat, faker } from "@snaplet/copycat";
import { generateMock } from "@anatine/zod-mock";
import { MeetingsSchema } from "prisma/generated/zod";
import { v7 } from "uuid";

import { categories as catsConst, meetingTypes } from "../../app/constants";
import { slugify } from "~/utils";
import { Meetings } from "@prisma/client";

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
      uuid: v7(),
    },
    ...createMany(100, () => ({
      type: "member",
    })),
  ]);
  console.log("users ? ", users);

  let testMeetings = new Array(100).fill(null).map((_, i) => {
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
  console.log("testMeetings ? ", testMeetings);

  await seed.meetings(testMeetings);
  //  ({ index }) => ({
  //   category: ({ seed }) => copycat.oneOf(seed, categories.map(cat => cat.uuid!)),
  //   group: ({ seed }) => copycat.oneOf(seed, testGroups.map(group => group.uuid!)),
  //   host: ({ seed }) => copycat.oneOf(seed, testUsers.map(user => user.uuid!)),
  //   description: ({ seed }) => copycat.paragraph(seed, {
  //     min: 1,
  //     max: 3,
  //   }),
  //   isDraft: index % 10 === 0,
  //   duration: ({ seed }) => copycat.oneOf(seed, [30, 60, 90, 120]),
  //   img: "https://consensus.nyc3.cdn.digitaloceanspaces.com/meeting_images/PXL_20231211_122430891.PORTRAIT.jpg",
  //   locationLink: ({ seed }) => copycat.url(seed),
  //   title: ({ seed }) => copycat.words(seed, {
  //     min: 3,
  //     max: 10
  //   }),
  // })));
  // console.log("resp ? ", resp2)

  console.log("Database seeded successfully!");
  process.exit();
};

main();
