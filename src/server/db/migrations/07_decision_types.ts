import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('decision_types', table => {
    table.string('type').notNullable().defaultTo('Simple Majority').primary();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('decision_types');
};
