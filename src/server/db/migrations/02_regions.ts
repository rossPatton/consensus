import Knex from 'knex';

exports.up = async (knex: Knex) => {
  // a region === a state, or a province, or some other way of parsing geographical
  // information that is smaller than a country but larger than a city
  await knex.schema.createTable('regions', table => {
    table.increments().unsigned().primary();

    // if state, name would be New York
    table.string('name').notNullable();

    // if state, code would be NY
    table.string('code').notNullable();

    // in this case, the US since we have no other options atm
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
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('regions');
};
