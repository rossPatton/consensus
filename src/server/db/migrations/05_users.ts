import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();
    table.timestamps(true, true);

    // additional optional info the user can choose to provide
    table.text('bio', 'longtext');

    // user's real name, optional value
    // visible on profile and attendee list for events
    table.string('name');

    // default name for displaying
    table.string('username').notNullable();

    // account recovery / verification, event reminders, etc
    table.string('email').notNullable().unique();
    // if set to true, email addresses aren't visible to other users or org
    table.boolean('privateEmail').notNullable().defaultTo(true);

    // contact info (useful if in leadership), ideally eventually useful for 2 factor
    table.string('phone').unique();
    // hide phone number by default, exception is for leadership roles
    table.boolean('privatePhone').notNullable().defaultTo(true);

    // optional - allow user to set their primary city
    // should be a city search, that renders all cities by region
    table.integer('city')
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if set to true, user location info above isn't visible
    // this is only relevant if someone visits a user's profile
    table.boolean('privateLocation').notNullable().defaultTo(true);

    // user's preferred language
    table.string('language').defaultTo('en');

    // if set to true, user RSVPS show up in the count but aren't visible in RSVP list
    // user will also be hidden from the attendees list on the event page
    table.boolean('privateRSVP').notNullable().defaultTo(true);

    // if set to true, user memberships aren't visible to others in user profile
    table.boolean('privateMemberships').notNullable().defaultTo(true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
