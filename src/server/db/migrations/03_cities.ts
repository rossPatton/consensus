import Knex from 'knex';

exports.up = async (knex: Knex) => {
  // each column in the directory table cooresponds to a directory
  // ie, the url /us should give a directory of all the states in the us
  // the url /us/ny should give a directory of all cities in ny
  // and the url /us/ny/nyc should give a director of all organization in nyc
  await knex.schema.createTable('cities', table => {
    table.increments().unsigned().primary();

    // New York City
    // name is not id, since many cities have same name
    table.string('name').notNullable();

    table.integer('country').notNullable().references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('region').notNullable().references('regions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('cities');
};
