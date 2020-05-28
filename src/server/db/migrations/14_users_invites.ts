import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users_invites', table => {
    table.increments('id').unsigned().primary();

    table.unique(['userId', 'groupId']);

    table.integer('userId')
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('groupId')
      .notNullable()
      .references('groups.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.enum('type', ['member', 'facilitator']).defaultTo('member');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users_invites');
};
