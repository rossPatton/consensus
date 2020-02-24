require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import orgs from '../../../json/orgs.json';
import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
const categories = [
  { type: 'Religious', slug: 'religion' },
  { type: 'Community Center', slug: 'community-center' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political Organization', slug: 'political-organization' },
];

const createOrg = async (orgId: number) => {
  const org = orgs[orgId];

  return {
    category: orgId === 1
      ? 'Political Organization'
      : categories[getRandomNum(0, categories.length - 1)].type,
    city: org.city,
    cityId: 16624,
    country: 'United States',
    countryId: 1,
    description: faker.lorem.paragraphs(),
    facebook: 'yes',
    handle: org.handle,
    name: org.name,
    region: org.region,
    regionId: org.regionId,
    twitter: 'yes',
    type: org.type,
    website: org.website || faker.internet.domainName(),
  };
};

exports.seed = async (knex: Knex) => {
  const fakeOrgs = [];

  for await (const orgId of range(orgs.length - 1)) {
    fakeOrgs.push(await createOrg(orgId));
  }

  await knex('orgs').del();
  await knex('orgs').insert(fakeOrgs);
};
