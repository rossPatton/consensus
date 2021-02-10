import Knex from 'knex';

const categories = [
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
];

export const up = async (knex: Knex) => {
  await knex.schema.createTable('groups', table => {
    table.increments().unsigned().primary();

    // when we save images to DO spaces, we use a uuid/v4 hash
    // this is then prefixed client side with a string that denotes the img type
    table.string('avatar').defaultTo('');

    // user-input about what the group does
    table.text('description', 'longtext').defaultTo('').notNullable();

    table.string('email').notNullable().unique();
    table.boolean('showOnboarding').notNullable().defaultTo(true);

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
    table.string('country')
      .defaultTo('United States')
      .notNullable()
      .references('countries.name')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // if group is scheduled for deletion
    table.timestamp('deletionDeadline').defaultTo(null);

    table.string('city')
      .defaultTo('Brooklyn')
      .notNullable();

    table.string('region')
      .defaultTo('New York')
      .notNullable();

    // for ease of lookup later if need be
    table.integer('cityId')
      .defaultTo(15928)
      .notNullable()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('countryId')
      .defaultTo(1)
      .notNullable()
      .references('countries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('regionId')
      .notNullable()
      .defaultTo(37)
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

    table.string('memberName').defaultTo('Member').notNullable();
    table.string('modName').defaultTo('Facilitator').notNullable();

    // group external website and social media, if available
    table.string('website').defaultTo('');
    table.string('facebook').defaultTo('');
    table.string('twitter').defaultTo('');

    // necessary to enable 2FA on an account
    table.string('otpSecret').defaultTo('');

    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('groups');
};
