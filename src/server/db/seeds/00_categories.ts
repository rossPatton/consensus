import Knex from 'knex';

const createCategories = () => ([
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
]);

export const seed = async (knex: Knex) => {
  await knex('categories').del();
  await knex('categories').insert(createCategories());
};
