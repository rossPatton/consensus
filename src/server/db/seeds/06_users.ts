require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createUser = async () => {
  // user selects city from dropdown with additional info (postcode,etc)
  const city = faker.random.boolean() ? 'New York' : '';
  // on the backend, we really just want the id of the correct city, cause dupes
  // city is used for display purposes, but the id is what we use for fetching etc
  // const cityId = city ? 16624 : null;

  return {
    bio: faker.lorem.paragraphs(),
    city,
    // cityId,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phone: faker.phone.phoneNumber(),
    privateEmail: faker.random.boolean(),
    privateMemberships: faker.random.boolean(),
    privateRSVP: false,
    username: faker.internet.userName(),
  };
};

const createTestUser = async () => ({
  bio: faker.lorem.paragraphs(),
  city: 'New York', // New York
  // cityId: 16624,
  name: 'Test User',
  phone: faker.phone.phoneNumber(),
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
