require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createUser = async () => ({
  bio: faker.lorem.paragraphs(),
  email: faker.internet.exampleEmail(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  phone: faker.phone.phoneNumber(),
  privateEmail: faker.random.boolean(),
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  username: faker.internet.userName(),
});

const createTestUser = async () => ({
  bio: faker.lorem.paragraphs(),
  city: 16624, // New York City
  email: 'test@test.com',
  name: 'Test User',
  phone: faker.phone.phoneNumber(),
  postcode: 10002,
  privateEmail: faker.random.boolean(),
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  username: 'testUsername',
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
