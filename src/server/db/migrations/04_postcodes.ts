import Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('postcodes', table => {
    table.increments().unsigned().primary();

    // cities, especially large ones, can have many postal codes
    table.string('city').notNullable();
    table.integer('code').notNullable();
    table.integer('cityId')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('postcodes');
};
