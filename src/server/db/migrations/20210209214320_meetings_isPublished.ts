import Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.table('meetings', t => {
    t.boolean('isPublished').defaultTo(false);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.table('meetings', t => {
    t.dropColumn('isPublished');
  });
};

