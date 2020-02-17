require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
import {slugify} from '../../../utils/slugify';

const categories = [
  { type: 'Religious', slug: 'religion' },
  { type: 'Community Center', slug: 'community-center' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political Organization', slug: 'political-organization' },
  // { type: 'Caucus' },
  // { type: 'Working Group' },
];
const categoryTypes = categories.map((c: any) => c.display);

const createOrg = async () => {
  const name = faker.company.companyName();
  const handle = slugify(name);
  const category = categoryTypes[getRandomNum(0, categoryTypes.length - 1)];
  const type = ['public', 'private', 'invite'];

  return {
    category,
    city: 'New York',
    cityId: 16624,
    country: 'United States',
    countryId: 1,
    description: faker.lorem.paragraphs(),
    handle,
    name,
    region: 'New York',
    regionId: 37,
    type: type[getRandomNum(0, type.length - 1)],
  };
};

const createTWC = async () => ({
  category: 'Political Organization',
  city: 'New York',
  cityId: 16624,
  country: 'United States',
  countryId: 1,
  description: faker.lorem.paragraphs(),
  handle: 'tech-workers-coalition-nyc',
  name: 'Tech Workers Coalition NYC',
  region: 'New York',
  regionId: 37,
  type: 'public',
});

exports.seed = async (knex: Knex) => {
  const fakeOrgs = [];

  for await (const _ of range(99, true)) {
    fakeOrgs.push(await createOrg());
  }

  fakeOrgs.push(await createTWC());

  await knex('orgs').del();
  await knex('orgs').insert(fakeOrgs);
};
