import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('accounts_roles', table => {
    table.increments('id').unsigned().primary();

    // account id of current session
    table.integer('accountId')
      .notNullable()
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // org where the user has the role
    table.integer('orgId')
      .notNullable()
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // user id of current session
    table.integer('userId')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // create unique composite key. a user can only have 1 role per org
    table.unique(['orgId', 'accountId', 'userId']);

    // relation the account has to the org
    // 'admin' || 'member' || 'facilitator'
    table.enum('role', ['admin', 'member', 'facilitator'])
      .notNullable()
      .defaultTo('member');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts_roles');
};
