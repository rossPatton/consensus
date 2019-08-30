import Knex from 'knex';

exports.up = async (knex: Knex) => {
  const countryId = 'countries.id';
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // a region === a state, or a province, or some other way of parsing geographical
  // information that is smaller than a country but larger than a city
  await knex.schema.createTable('countries', table => {
    table.increments().unsigned().primary();

    // United States
    table.string('name').notNullable();
    // USA
    table.string('code').notNullable();
    // name for regions in this country (state|province|prefecture|etc)
    table.string('regionType').notNullable().defaultTo('state');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // a region === a state, or a province, or some other way of parsing geographical
  // information that is smaller than a country but larger than a city
  await knex.schema.createTable('regions', table => {
    table.increments().unsigned().primary();

    // if state, name would be New York
    table.string('name').notNullable();
    // if state, code would be NY
    table.string('code').notNullable();

    // in this case, the US since we have no other options atm
    table.integer('country').notNullable().references(countryId);

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // each column in the directory table cooresponds to a directory
  // ie, the url /us should give a directory of all the states in the us
  // the url /us/ny should give a directory of all cities in ny
  // and the url /us/ny/nyc should give a director of all organization in nyc
  await knex.schema.createTable('cities', table => {
    table.increments().unsigned().primary();

    // New York City
    // name is not id, since many cities have same name
    table.string('name').notNullable();

    table.integer('country').notNullable().references(countryId);
    table.integer('region').notNullable().references('regions.id');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users', table => {
    table.increments().unsigned().primary();

    table.string('email').notNullable();
    table.string('password').notNullable();

    table.string('fname');
    table.string('lname');
    table.string('username').notNullable();

    // optional - allow user to set their primary city
    // on login, take user to directory for that location
    table.integer('city').references('cities.id');

    // user's preferred language
    table.string('language').defaultTo('en');

    table.timestamp('lastActive').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('orgs', table => {
    table.increments().unsigned().primary();

    table.string('category').notNullable();
    table.integer('membershipTotal').unsigned().notNullable().defaultTo(0);
    table.text('description', 'longtext').notNullable();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('slug').notNullable();

    // gate is the best 1 word term i could think of for it
    // on user signup - do we gatekeep who can join or not?
    // public === 'anyone can join, no questions asked, no screening'
    // restricted === 'anyone can join, but we require manual approval'
    // private === '100% manual approval. only pre-approved members can join'
    table.string('gate').notNullable().defaultTo('public');

    // orgs are also 'accounts' of their own, can login, etc
    table.string('password').notNullable();
    table.string('username').notNullable();

    // display names for ease of use, 99% of what we need on the client usually
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.string('region').notNullable();

    // for ease of lookup later if need be
    table.integer('cityId').notNullable().references('cities.id');
    table.integer('countryId').notNullable().references(countryId);
    table.integer('regionId').notNullable().references('regions.id');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users_orgs', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId').notNullable().references('users.id');
    table.integer('orgId').notNullable().references('orgs.id');

    // roles can be of one of type 'member' | 'admin'
    table.string('role').notNullable().defaultTo('member');
  });

  await knex.schema.createTable('events', table => {
    table.increments().unsigned().primary();

    // all events are tied to an org currently
    // id so we can look up whatever we need if necessary
    // name because 90% of the time that's all we need
    // TODO - eventually, events should be searchable by city/state, etc
    table.integer('orgId').notNullable().references('orgs.id');
    table.string('orgName').notNullable();

    table.boolean('isPrivate').defaultTo(false);
    table.string('category').notNullable();
    table.text('description', 'longtext').notNullable();
    table.text('location').defaultTo('Location To Be Determined');
    table.text('locationLink');
    table.text('title').notNullable();
    table.timestamp('date').notNullable();
    table.timestamp('endDate');

    table.integer('goingCount').unsigned().notNullable().defaultTo(0);

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  // await knex.schema.createTable('images', table => {
  //   table.increments().unsigned().primary();
  //   table.timestamp('createdAt').defaultTo(knex.fn.now());
  //   table.timestamp('updatedAt').defaultTo(knex.fn.now());
  // });

  // await knex.schema.createTable('images_events', table => {
  //   table.increments().unsigned().primary();

  //   table.integer('imgId').notNullable().references('images.id');
  //   table.integer('eventId').notNullable().references('events.id');

  //   table.timestamp('createdAt').defaultTo(knex.fn.now());
  //   table.timestamp('updatedAt').defaultTo(knex.fn.now());
  // });

  await knex.schema.createTable('users_events', table => {
    table.increments('id').unsigned().primary();

    table.integer('userId').notNullable().references('users.id');
    table.integer('eventId').notNullable().references('events.id');
    table.boolean('rsvp').notNullable().defaultTo(false);
  });

  await knex.schema.createTable('decision_types', table => {
    table.string('type').notNullable().defaultTo('Simple Majority').primary();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('decisions', table => {
    table.increments().unsigned().primary();

    // the org that made the decision / poll
    table.integer('orgId').notNullable().references('orgs.id');

    // the type of voting system the decision used (defaults to simple majority)
    table.string('type').notNullable().references('decision_types.type');

    table.text('description', 'longtext').notNullable();
    table.text('minutes', 'longtext');
    table.text('rationale');
    table.text('title').notNullable();
    table.timestamp('date').notNullable();

    // data is different for every poll, but the shape of the data
    // is determined by the poll type
    table.jsonb('data').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users_decisions', table => {
    table.increments('id').unsigned().primary();
    table.integer('userId').notNullable().references('users.id');
    table.integer('decisionId').notNullable().references('decisions.id');
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('cities');
  await knex.schema.dropTable('regions');
  await knex.schema.dropTable('countries');
  await knex.schema.dropTable('decision_types');
  await knex.schema.dropTable('decisions');
  await knex.schema.dropTable('events');
  await knex.schema.dropTable('orgs');
  await knex.schema.dropTable('users_decisions');
  await knex.schema.dropTable('users_events');
  await knex.schema.dropTable('users_orgs');
  await knex.schema.dropTable('users');
};
