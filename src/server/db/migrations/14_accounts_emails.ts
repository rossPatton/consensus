import Knex from 'knex';

// tie accounts (of either type) to emails (accounts can eventually have several)
exports.up = async (knex: Knex) => {
  await knex.schema.createTable('accounts_emails', table => {
    table.increments('id').unsigned().primary();

    // account id of current session
    table.integer('accountId')
      .notNullable()
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // org where the user has the role
    table.string('email').notNullable().unique();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts_emails');
};
