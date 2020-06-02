import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users_meetings', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId')
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('meetingId')
      .notNullable()
      .references('meetings.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.enum('type', ['public', 'private'])
      .notNullable()
      .defaultTo('private');

    table.enum('value', ['yes', 'no', 'maybe']);

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users_meetings');
};
