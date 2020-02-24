require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createUser = async () => {
  // user selects city from dropdown with additional info (postcode,etc)
  const city = faker.random.boolean() ? 'New York' : '';

  return {
    bio: faker.lorem.paragraphs(),
    city,
    facebook: 'yes',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phone: faker.phone.phoneNumber(),
    privateEmail: faker.random.boolean(),
    privateMemberships: faker.random.boolean(),
    privateRSVP: false,
    twitter: 'yes',
    username: faker.internet.userName(),
    website: faker.internet.domainName(),
  };
};

const createTestUser = async () => ({
  bio: faker.lorem.paragraphs(),
  city: 'New York',
  facebook: 'yes',
  name: 'Test User',
  phone: faker.phone.phoneNumber(),
  privateEmail: faker.random.boolean(),
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  twitter: 'yes',
  username: 'testUsername',
  website: faker.internet.domainName(),
});

exports.seed = async (knex: Knex) => {
  const fakeUsers = [];

  for await (const _ of range(99, true)) {
    fakeUsers.push(await createUser());
  }

  // testUser === user info for admin account
  fakeUsers.push(await createTestUser());

  // we delete all rows from our tables to get a clean slate
  // if a previous migration or seed ran and it errored, you might to reset
  // the knex migration history in order to run this script again
  await knex('users').del();
  await knex('users').insert(fakeUsers);
};