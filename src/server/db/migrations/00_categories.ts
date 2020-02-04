import Knex from 'knex';

const categories = [
  { type: 'Religious', slug: 'religion' },
  { type: 'Community Center', slug: 'community-center' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political Organization', slug: 'political-organization' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
];

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('categories', table => {
    table
      .enum('type', categories.map(c => c.type))
      .notNullable()
      .defaultTo('Political Organization')
      .primary();

    table
      .enum('slug', categories.map(c => c.slug))
      .notNullable()
      .defaultTo('political-organization');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('categories');
};
