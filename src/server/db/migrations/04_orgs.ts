import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('orgs', table => {
    table.increments().unsigned().primary();

    table.string('category').notNullable();
    table.integer('membershipTotal').unsigned().notNullable().defaultTo(0);
    table.text('description', 'longtext').notNullable();
    table.string('name').notNullable();
    table.string('slug').notNullable();

    // gate is the best 1 word term i could think of for it
    // on user signup - do we gatekeep who can join or not?
    // public === 'anyone can join, no questions asked, no screening'
    // manual === 'anyone can join, but we require manual approval'
    // private === 'members must be invited to join'
    table.string('gate').notNullable().defaultTo('manual');

    // eventPrivacy is an admin override for event privacy settings
    // public === 'all events are public'
    // manual === 'events default to public, but can be made private'
    // private === 'all events are private'
    table.string('eventPrivacy').notNullable().defaultTo('manual');

    // display names for ease of use, 99% of what we need on the client usually
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.string('region').notNullable();

    // for ease of lookup later if need be
    table.integer('cityId')
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('countryId')
      .notNullable()
      .references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('regionId')
      .notNullable()
      .references('regions.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('orgs');
};
