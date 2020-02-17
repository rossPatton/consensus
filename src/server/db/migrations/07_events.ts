import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('events', table => {
    table.increments().unsigned().primary();

    // all events are tied to an org currently
    // id so we can look up whatever we need if necessary
    // name because 90% of the time that's all we need
    // TODO - eventually, events should be searchable by city/state, etc
    table.integer('orgId')
      .notNullable()
      .references('orgs.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('orgName').notNullable();

    // if private, the event is not visible to non group members
    // if public, the event is visible to anyone
    // table.boolean('isPrivate').defaultTo(false);
    table.boolean('isDraft').notNullable().defaultTo(true);

    table.text('description', 'longtext').notNullable();
    table.text('location').defaultTo('Location To Be Determined');
    table.text('locationLink');
    table.text('title').notNullable();
    table.timestamp('date').notNullable();
    table.timestamp('endDate');

    // stuff below here is to maintain parity with the event creation form/drafts
    // it is not used when rendering events - but still needed
    // default 2 hours event duration, used to calculate endDate along with time
    table.integer('duration').defaultTo(2);

    // ref to where img lives on file server. only created if image is uploaded
    table.string('pathToFeaturedImage');

    // time of day the event occurs. used to calculate endDate along with duration
    table.string('time').notNullable().defaultTo('19:00');
    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('events');
};
