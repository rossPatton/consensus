import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('accounts_roles', table => {
    table.increments('id').unsigned().primary();

    // account id of current session
    table.integer('accountId')
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // org where the user has a role. or, if org account, the id of the org
    table.integer('orgId')
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // relation the account has to the org
    // 'member' || 'facilitator' || 'admin'
    table.string('role').notNullable().defaultTo('member');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('accounts_roles');
};
