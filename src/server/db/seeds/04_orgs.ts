require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';
import {slugify} from '../../../utils/slugify';

const createOrg = async () => {
  const name = faker.company.companyName();
  const slug = slugify(name);

  return {
    category: faker.lorem.word(),
    city: 'New York City',
    cityId: 3658,
    country: 'United States',
    countryId: 1,
    description: faker.lorem.paragraphs(),
    gate: 'public',
    membershipTotal: faker.random.number(),
    name,
    region: 'New York',
    regionId: 37,
    slug,
  };
};

const createTWC = async () => ({
  category: 'Tech and Science Activism',
  city: 'New York City',
  cityId: 3658,
  country: 'United States',
  countryId: 1,
  description: faker.lorem.paragraphs(),
  gate: 'restricted',
  membershipTotal: 1789,
  name: 'Tech Workers Coalition NYC',
  region: 'New York',
  regionId: 37,
  slug: 'tech-workers-coalition-nyc',
});

exports.seed = async (knex: Knex) => {
  const fakeOrgs = [];

  for await (const _ of range(100, true)) {
    fakeOrgs.push(await createOrg());
  }

  fakeOrgs.push(await createTWC());

  await knex('orgs').del();
  await knex('orgs').insert(fakeOrgs);
};
