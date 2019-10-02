require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createUser = async () => ({
  email: faker.internet.exampleEmail(),
  fname: faker.name.firstName(),
  lname: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  username: faker.internet.userName(),
});

const createTestUser = async () => ({
  city: 3658, // New York City
  email: 'test@test.com',
  fname: 'test',
  lname: 'user',
  phone: faker.phone.phoneNumber(),
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