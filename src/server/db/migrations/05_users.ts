import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    // additional info that could be made public, but is private by default
    table.text('bio', 'longtext');
    table.string('name'); // real name
    table.string('username').notNullable(); // public name

    // account recovery / verification
    table.string('email').notNullable().unique();
    // if set to true, email addresses aren't visible to other users or org
    table.boolean('privateEmail').notNullable().defaultTo(true);

    table.string('phone').unique();

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

    // if set to true, user location isn't visible to others
    table.boolean('privateLocation').notNullable().defaultTo(true);

    // user's preferred language
    table.string('language').defaultTo('en');

    // if set to true, user RSVPS show up in the count but aren't visible in RSVP list
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
