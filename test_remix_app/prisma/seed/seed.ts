/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

async function main() {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const categories = [
    {
      "display": "Community",
      "slug": "community",
      "uuid": "0192ab79-9d15-7217-9d8b-0899a54094fa",
      "description": 'Your local neighborhood group. From your church, to community centers, any kind of miscellaneous group can be found here.',
    },
    {
      "display": "Cooperative",
      "slug": "coop",
      "uuid": "0192ab7b-3987-70a7-a31c-c366d22bd540",
      "description": 'For your local worker-owned or membership-based cooperative. Come to consensus, on Consensus.',
    },
    {
      "display": "Unions & Labor",
      "slug": "union",
      "uuid": "0192ab7b-50a6-788c-9a12-2abf0c596e28",
      "description": "Find your local union, worker's center or other labor-affilitated group. Never miss another union meeting!",
    },
    {
      "display": "Political",
      "slug": "pol",
      "uuid": "0192ab7b-66dc-728f-b92e-4c1ba1a72be3",
      "description": "From anarchist collectives to the Democratic Socialists of America or Tech Worker's Coalition, get involved with your local political group today.",
    },
  ];

  await seed.categories(categories);

  console.log("Database seeded successfully!");

  process.exit();
};

main();