require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import orgs from '../../../json/orgs.json';
import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
const categories = [
  { type: 'Community', slug: 'community' },
  { type: 'Cooperative', slug: 'cooperative' },
  { type: 'Union', slug: 'union' },
  { type: 'Political', slug: 'political' },
];

const createOrg = async (orgId: number) => {
  const org = orgs[orgId];
  const category = orgId === 0
    ? 'Political'
    : categories[getRandomNum(0, categories.length - 1)].type;

  return {
    allowNonVerified: org.type === 'public',
    category,
    city: org.city,
    cityId: 16624,
    country: 'United States',
    countryId: 1,
    description: faker.lorem.paragraphs(),
    facebook: 'https://facebook.com',
    handle: org.handle,
    memberName: 'Member',
    modName: 'Facilitator',
    name: org.name,
    region: org.region,
    regionId: org.regionId,
    twitter: 'https://twitter.com',
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
