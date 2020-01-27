import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('accounts', table => {
    table.increments('id').unsigned().primary();

    table.string('login').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('isVerified').defaultTo(false);

    // if user type
    table.integer('userId')
      .unique()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if org type
    table.integer('orgId')
      .unique()
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    // table.timestamp('lastActive').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts');
};
