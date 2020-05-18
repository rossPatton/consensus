import Knex from 'knex';

const categories = ['Community', 'Cooperative', 'Union', 'Political'];

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('meetings', table => {
    table.increments().unsigned().primary();

    // columns below are added automatically based on group and group type
    table
      .enum('category', categories)
      .notNullable()
      .references('categories.type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('groupId')
      .notNullable()
      .references('groups.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('cityId')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('groupName')
      .notNullable()
      .references('groups.name')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if private, the meeting is not visible to non group members
    // if public, the meeting is visible to anyone
    // value is based on group type
    table.boolean('isPrivate').defaultTo(false);
    table.boolean('isOnline').defaultTo(true);

    // columns below are manually added by user when creating an meeting/meeting
    table.text('description', 'longtext').notNullable();
    table.text('location').defaultTo('Location To Be Determined');
    table.text('locationLink');
    table.enum('locationType', ['online', 'offline']).defaultTo('online');
    table.text('title').notNullable().unique();
    table.text('slug').notNullable().unique();
    table.timestamp('date').notNullable();
    table.timestamp('endDate').notNullable();

    // if user saves meeting as draft instead of publishing right away
    table.boolean('isDraft').notNullable().defaultTo(true);

    // hash of featured image, if one has been uploaded
    table.string('img');

    // time of day the meeting occurs. used to calculate endDate
    table.string('time').notNullable().defaultTo('19:00');
    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('meetings');
};
