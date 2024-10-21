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
    },
    {
      "display": "Cooperative",
      "slug": "coop",
      "uuid": "0192ab7b-3987-70a7-a31c-c366d22bd540",
    },
    {
      "display": "Unions & Labor",
      "slug": "union",
      "uuid": "0192ab7b-50a6-788c-9a12-2abf0c596e28",
    },
    {
      "display": "Political",
      "slug": "pol",
      "uuid": "0192ab7b-66dc-728f-b92e-4c1ba1a72be3",
    },
  ];

  await seed.categories(categories);

  console.log("Database seeded successfully!");

  process.exit();
};

main();