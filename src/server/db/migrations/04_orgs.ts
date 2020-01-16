import Knex from 'knex';

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('orgs', table => {
    table.increments().unsigned().primary();

    // user-input about what the group does
    table.text('description', 'longtext').notNullable();

    // name of the group
    table.string('name').notNullable();

    // slugified version of the name, for urls
    table.string('slug').notNullable();

    // gate is the best 1 word term i could think of for it
    // on user signup - do we gatekeep who can join or not?
    // public === anyone can join, no questions asked, no screening
    // manual === anyone can join, but we require manual approval
    // invite === members must be invited to join, org is hidden from search
    // TODO we should also make sure to hide these orgs from google as well
    table.string('gate').notNullable().defaultTo('manual');

    // eventPrivacy is an admin override for event privacy settings
    // public === all events are public'
    // manual === events default to public, but can be made private case-by-case
    // private === all events are private, only viewable by org members
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

    // activist group, non-profit, union, cooperative, etc
    table.string('category')
      .notNullable()
      .defaultTo('Political Organization')
      .references('categories.type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('orgs');
};
