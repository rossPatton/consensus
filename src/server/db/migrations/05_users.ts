import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    // additional optional info the user can choose to provide
    table.text('bio', 'longtext');

    // user's real name
    table.string('name');
    // if set to true, then name isn't visible to other users or org
    table.boolean('privateName').notNullable().defaultTo(true);

    // if user hides their real name the username is what we display instead
    table.string('username').notNullable();

    // account recovery / verification, event reminders, etc
    table.string('email').notNullable().unique();
    // if set to true, email addresses aren't visible to other users or org
    table.boolean('privateEmail').notNullable().defaultTo(true);

    // contact info (useful if in leadership), ideally eventually useful for sms
    table.string('phone').unique();
    // hide phone number by default, exception is for leadership roles
    table.boolean('privatePhone').notNullable().defaultTo(true);

    // optional - allow user to change their country, eventually
    table.integer('country')
      .references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // optional - allow user to change their country, eventually
    table.integer('region')
      .references('regions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // optional - allow user to set their primary city
    // on login, take user to directory for that location
    table.integer('city')
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if set to true, user location info above isn't visible
    table.boolean('privateLocation').notNullable().defaultTo(true);

    // user's preferred language
    table.string('language').defaultTo('en');

    // if set to true, user RSVPS show up in the count but aren't visible in RSVP list
    // user will also not show up in the attendees list on the event page
    table.boolean('privateRSVP').notNullable().defaultTo(true);

    // if set to true, user memberships aren't visible to others in user profile
    table.boolean('privateMemberships').notNullable().defaultTo(true);

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
