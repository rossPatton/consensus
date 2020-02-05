import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('postcodes', table => {
    table.increments().unsigned().primary();

    table.string('code').notNullable();

    // cities, especially large ones, can have many postal codes
    table.integer('city')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('postcodes');
};
