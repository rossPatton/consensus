require('dotenv-safe').config();
import Knex from 'knex';

const createCategories = () => ([
  { type: 'Religious', slug: 'religion' },
  { type: 'Community Center', slug: 'community-center' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political Organization', slug: 'political-organization' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
]);

exports.seed = async (knex: Knex) => {
  await knex('categories').del();
  await knex('categories').insert(createCategories());
};
