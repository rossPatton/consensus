import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    // additional optional info the user can choose to provide
    table.text('bio', 'longtext');

    // user's real name, optional value
    // visible on profile and attendee list for events
    table.string('name');

    // default name for displaying
    table.string('username').notNullable().defaultTo('');

    // contact info (useful if in leadership), ideally eventually useful for 2 factor
    table.string('phone').unique();

    // optional - allow user to set their primary city
    // @TODO eventually build form such that when a user selects a city,
    // the cooresponding region and zip is shown, so we can use that for geolocation
    // instead of geolocating every time
    table.string('city').defaultTo('');

    // user's preferred language
    table.string('language').notNullable().defaultTo('en');

    // if set to true, user RSVPS show up in the count but aren't visible in RSVP list
    // user will also be hidden from the attendees list on the event page
    table.boolean('privateRSVP').notNullable().defaultTo(true);

    // if set to true, user memberships aren't visible to others in user profile
    table.boolean('privateMemberships').notNullable().defaultTo(true);

    // the auto-generated string for a libravatar avatar
    // it falls back to gravatar if lookup fails
    // we do NOT store the actual email we are given, just the generated hashed url
    table.string('avatarHash').defaultTo(null);

    // user's personal website
    table.string('website').defaultTo('');
    table.string('facebook').defaultTo('');
    table.string('twitter').defaultTo('');

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('users');
};
