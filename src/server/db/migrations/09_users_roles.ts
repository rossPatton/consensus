import Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('users_roles', table => {
    table.increments('id').unsigned().primary();

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
    table.unique(['groupId', 'userId']);

    // relation the account has to the org
    // 'admin' || 'member' || pending || 'facilitator'
    table.enum('role', ['admin', 'member', 'pending', 'facilitator'])
      .notNullable()
      .defaultTo('member');

    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('users_roles');
};
