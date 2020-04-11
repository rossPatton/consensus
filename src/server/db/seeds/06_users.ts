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
    facebook: faker.random.boolean ? '' : null as any,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phone: faker.phone.phoneNumber(),
    privateMemberships: faker.random.boolean(),
    privateRSVP: false,
    twitter: '',
    username: faker.internet.userName(),
    website: faker.internet.domainName(),
  };
};

const createTestUser = async () => ({
  avatarHash: '0e55598077105311173b7624dd7619ca6afceecd9b2891638487b00f2c133ac5',
  bio: faker.lorem.paragraphs(),
  city: 'New York',
  cityId: 16624,
  facebook: '',
  name: 'Test User',
  phone: faker.phone.phoneNumber(),
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  region: 'New York',
  regionId: 37,
  twitter: null as any,
  username: 'testUsername',
  website: faker.internet.domainName(),
});

const createLongPasswordTestUser = async () => ({
  bio: faker.lorem.paragraphs(),
  city: 'New York',
  cityId: 16624,
  facebook: null as any,
  name: 'Test User Long Pass',
  phone: faker.phone.phoneNumber(),
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  region: 'New York',
  regionId: 37,
  twitter: '',
  username: 'testLongPass',
  website: faker.internet.domainName(),
});

exports.seed = async (knex: Knex) => {
  const fakeUsers = [];

  for await (const _ of range(99, true)) {
    fakeUsers.push(await createUser());
  }

  // testUser === user info for admin account
  fakeUsers.push(await createTestUser());
  fakeUsers.push(await createLongPasswordTestUser());

  // we delete all rows from our tables to get a clean slate
  // if a previous migration or seed ran and it errored, you might to reset
  // the knex migration history in order to run this script again
  await knex('users').del();
  await knex('users').insert(fakeUsers);
};
