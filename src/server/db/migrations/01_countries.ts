import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');

  // a region === a state, or a province, or some other way of parsing geographical
  // information that is smaller than a country but larger than a city
  await knex.schema.createTable('countries', table => {
    table.increments().unsigned().primary();

    // United States
    table.string('name').notNullable();
    // US
    table.string('code').notNullable();
    // name for regions in this country (state|province|prefecture|etc)
    table.string('regionType').notNullable().defaultTo('state');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('countries');
};
