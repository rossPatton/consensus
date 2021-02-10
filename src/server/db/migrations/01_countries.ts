import Knex from 'knex';

export const up= async (knex: Knex) => {
  // a region === a state, or a province, or some other way of parsing geographical
  // information that is smaller than a country but larger than a city
  await knex.schema.createTable('countries', table => {
    table.increments().unsigned().primary();

    // United States
    table.string('name').notNullable().unique();
    // US
    table.string('code').notNullable().unique();
    // name for regions in this country (state|province|prefecture|etc)
    table.string('regionType').notNullable().defaultTo('state');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('countries');
};
