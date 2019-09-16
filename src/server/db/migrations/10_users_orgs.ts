import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users_orgs', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId')
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('orgId')
      .notNullable()
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // roles can be of one of type 'member' | 'admin'
    table.string('role').notNullable().defaultTo('member');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users_orgs');
};
