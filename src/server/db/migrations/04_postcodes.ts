import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('postcodes', table => {
    table.increments().unsigned().primary();

    table.integer('code').notNullable();

    // cities, especially large ones, can have many postal codes
    table.string('city').notNullable();
    table.integer('cityId')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // create unique composite key. some cities share zipcodes
    table.unique(['code', 'city']);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('postcodes');
};
