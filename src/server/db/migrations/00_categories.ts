import Knex from 'knex';

const categories = [
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
];

export const up = async (knex: Knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');
  await knex.schema.createTable('categories', table => {
    table
      .enum('type', categories.map(c => c.type))
      .notNullable()
      .defaultTo('Political')
      .primary();

    table
      .enum('slug', categories.map(c => c.slug))
      .notNullable()
      .defaultTo('political');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('categories');
};
