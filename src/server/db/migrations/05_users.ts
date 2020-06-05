import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    // when we save images to DO spaces, we use a uuid/v4 hash
    // this is then prefixed client side with a string that denotes the img type
    table.string('avatar').defaultTo('');

    // additional optional info the user can choose to provide
    table.text('bio', 'longtext');

    table.string('email').notNullable().unique();
    table.boolean('showOnboarding').notNullable().defaultTo(true);

    // user's real name, optional value
    // visible on profile and attendee list for meetings
    table.string('name');

    // default name for displaying
    table.string('username').notNullable().defaultTo('').unique();

    table.string('city');
    table.string('region');

    table.string('country')
      .defaultTo('United States')
      .references('countries.name')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // for ease of lookup later if need be
    table.integer('cityId')
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('countryId')
      .defaultTo(1)
      .references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('regionId')
      .references('regions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // user's preferred language
    table.string('language').notNullable().defaultTo('en');

    // if set to true, user RSVPS show up in the count but aren't visible in RSVP list
    // user will also be hidden from the attendees list on the meeting page
    table.boolean('privateRSVP').notNullable().defaultTo(true);

    // if set to true, user memberships aren't visible to others in user profile
    table.boolean('privateMemberships').notNullable().defaultTo(true);

    // user's personal website
    table.string('website').defaultTo('');
    table.string('facebook').defaultTo('');
    table.string('twitter').defaultTo('');

    // necessary to enable 2FA on an account
    table.string('otpSecret').defaultTo('');

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
