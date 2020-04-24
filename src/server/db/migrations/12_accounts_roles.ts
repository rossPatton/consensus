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
    table.integer('groupId')
      .notNullable()
      .references('groups.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // user id of current session
    table.integer('userId')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // create unique composite key. a user can only have 1 role per org
    table.unique(['groupId', 'accountId', 'userId']);

    // relation the account has to the org
    // 'admin' || 'member' || pending || 'facilitator'
    table.enum('role', ['admin', 'member', 'pending', 'facilitator'])
      .notNullable()
      .defaultTo('member');

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts_roles');
};
