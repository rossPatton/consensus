import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('categories', table => {
    table.string('type').notNullable().defaultTo('Political Organization').primary();
    table.string('slug').notNullable().defaultTo('political-organization');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('categories');
};
