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
      "uuid": v7(),
      "description": 'Your local neighborhood group. From your church, to community centers, any kind of miscellaneous group can be found here.',
    },
    {
      "display": "Cooperative",
      "slug": "coop",
      "uuid": v7(),
      "description": 'For your local worker-owned or membership-based cooperative. Come to consensus, on Consensus.',
    },
    {
      "display": "Unions & Labor",
      "slug": "union",
      "uuid": v7(),
      "description": "Find your local union, worker's center or other labor-affilitated group. Never miss another union meeting!",
    },
    {
      "display": "Political",
      "slug": "pol",
      "uuid": v7(),
      "description": "From anarchist collectives to the Democratic Socialists of America or Tech Worker's Coalition, get involved with your local political group today.",
    },
  ];

  const testGroups = [
    {
      "category": categories.find((c) => c.slug === "community")?.uuid,
      "description": 'Your local neighborhood test group.',
      "name": "Test Community",
      "slug": "test_community",
      "uuid": v7(),
    },
    {
      "category": categories.find((c) => c.slug === "community")?.uuid,
      "description": 'Your local neighborhood test cooperative.',
      "name": "Test Cooperative",
      "slug": "test_cooperative",
      "uuid": v7(),
    },
  ];

  await seed.categories(categories);
  await seed.groups(testGroups);

  console.log("Database seeded successfully!");

  process.exit();
};

main();