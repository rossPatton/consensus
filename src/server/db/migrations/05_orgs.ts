import Knex from 'knex';

const categories = [
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
];

exports.up = async (knex: Knex) => {
  await knex.schema.createTable('orgs', table => {
    table.increments().unsigned().primary();

    // user-input about what the group does
    table.text('description', 'longtext').notNullable();

    // name of the group
    table.string('name').notNullable().unique();

    // slugified version of the name, for urls
    table.string('handle').notNullable().unique();

    // group type determines the level of privacy and vetting for your group
    // public === anyone can join, no questions asked, no screening, everything public
    // private === anyone can join, but we require manual approval. everything private
    // hidden === hidden only. private + org is hidden from google and internal search
    table.enum('type', ['public', 'private', 'hidden'])
      .notNullable()
      .defaultTo('public');

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
    table.enum('category', categories.map(c => c.type))
      .notNullable()
      .defaultTo('Political')
      .references('categories.type')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // group external website and social media, if available
    table.string('website').defaultTo('');
    table.string('facebook').defaultTo('');
    table.string('twitter').defaultTo('');

    table.timestamps(true, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable('orgs');
};
