import Knex from 'knex';

exports.up = async (knex: Knex) => {
  // each column in the directory table cooresponds to a directory
  // ie, the url /us should give a directory of all the states in the us
  // the url /us/ny should give a directory of all cities in ny
  // and the url /us/ny/nyc should give a director of all organization in nyc
  await knex.schema.createTable('cities', table => {
    table.increments().unsigned().primary();

    // New York
    // name is not id, since many cities have same name
    table.string('name').notNullable();

    table.integer('countryId')
      .notNullable()
      .references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(1);
    table.string('country')
      .notNullable()
      .references('countries.name')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo('United States');

    table.integer('regionId')
      .notNullable()
      .references('regions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(37);

    table.string('region')
      .notNullable()
      .defaultTo('New York');

    table.string('regionCode')
      .notNullable()
      .defaultTo('ny');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('cities');
};
