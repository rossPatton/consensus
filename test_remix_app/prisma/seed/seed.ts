/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { v7 } from "uuid";

async function main() {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const categories = [
    {
      "display": "Community",
      "slug": "community",
      "description": 'Your local neighborhood group. From your church, to community centers, any kind of miscellaneous group can be found here.',
      uuid: v7(),
    },
    {
      "display": "Cooperative",
      "slug": "coop",
      "description": 'For your local worker-owned or membership-based cooperative. Come to consensus, on Consensus.',
      uuid: v7(),
    },
    {
      "display": "Unions & Labor",
      "slug": "union",
      "description": "Find your local union, worker's center or other labor-affilitated group. Never miss another union meeting!",
      uuid: v7(),
    },
    {
      "display": "Political",
      "slug": "pol",
      "description": "From anarchist collectives to the Democratic Socialists of America or Tech Worker's Coalition, get involved with your local political group today.",
      uuid: v7(),
    },
  ];

  const store = await seed.categories(categories);
  console.log("🚀 ~ main ~ cats:", store)

  const testGroups = [
    {
      "category": categories.find((cat) => cat.slug === "community")!.uuid!,
      "description": 'Your local neighborhood test group.',
      "name": "Test Community",
      "slug": "test_community",
    },
    {
      "category": categories.find((cat) => cat.slug === "coop")!.uuid!,
      "description": 'Your local neighborhood test cooperative.',
      "name": "Test Cooperative",
      "slug": "test_cooperative",
    },
  ];

  await seed.groups(testGroups);

  console.log("Database seeded successfully!");

  process.exit();
};

main();