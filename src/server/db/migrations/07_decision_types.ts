import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('decision_types', table => {
    table.string('type').notNullable().defaultTo('Simple Majority').primary();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('decision_types');
};
