import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('postcode', table => {
    table.increments().unsigned().primary();

    table.string('code').notNullable();

    table.integer('city')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('cities');
};
