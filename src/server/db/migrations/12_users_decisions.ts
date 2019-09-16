import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users_decisions', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId').notNullable().references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('decisionId').notNullable().references('decisions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users_orgs');
};
