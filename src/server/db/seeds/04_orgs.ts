require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {categories} from '../../../constants';
import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
import {slugify} from '../../../utils/slugify';

const createOrg = async () => {
  const name = faker.company.companyName();
  const slug = slugify(name);
  const category = categories[getRandomNum(0, 4)];

  return {
    category,
    city: 'New York City',
    cityId: 3658,
    country: 'United States',
    countryId: 1,
    description: faker.lorem.paragraphs(),
    gate: 'public',
    name,
    region: 'New York',
    regionId: 37,
    slug,
  };
};

const createTWC = async () => ({
  category: 'Political Organization',
  city: 'New York City',
  cityId: 3658,
  country: 'United States',
  countryId: 1,
  description: faker.lorem.paragraphs(),
  gate: 'invite',
  name: 'Tech Workers Coalition NYC',
  region: 'New York',
  regionId: 37,
  slug: 'tech-workers-coalition-nyc',
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
