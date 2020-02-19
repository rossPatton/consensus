require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import orgs from '../../../json/orgs.json';

const createOrg = async (org: any) => ({
  category: org.category,
  city: org.city,
  cityId: 16624,
  country: 'United States',
  countryId: 1,
  description: faker.lorem.paragraphs(),
  handle: org.handle,
  name: org.name,
  region: org.region,
  regionId: org.regionId,
  type: org.type,
});

exports.seed = async (knex: Knex) => {
  const fakeOrgs = [];

  for await (const org of orgs) {
    fakeOrgs.push(await createOrg(org));
  }

  await knex('orgs').del();
  await knex('orgs').insert(fakeOrgs);
};
