import faker from 'faker';
import Knex from 'knex';
import {range} from 'lodash';

import {getRandomNum} from '../../../utils/getRandomNum';

const createUser = async () => {
  // user selects city from dropdown with additional info (postcode,etc)
  const city = faker.random.boolean() ? 'New York' : '';
  const email = faker.internet.email(
    faker.name.firstName(),
    faker.name.lastName(),
    'gmail.com',
  );

  return {
    avatar: getRandomNum(1, 7),
    bio: faker.lorem.paragraphs(),
    city,
    email,
    facebook: faker.random.boolean
      ? `https://${faker.internet.domainName()}`
      : null as any,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    privateMemberships: faker.random.boolean(),
    privateRSVP: false,
    twitter: `https://${faker.internet.domainName()}`,
    username: faker.internet.userName(),
    website: `https://${faker.internet.domainName()}`,
  };
};

const createTestUser = async () => ({
  avatar: '1',
  bio: faker.lorem.paragraphs(),
  city: 'New York',
  cityId: 16624,
  email: 'ross_patton@pm.me',
  facebook: '',
  name: 'Test User',
  privateMemberships: faker.random.boolean(),
  privateRSVP: false,
  region: 'New York',
  regionId: 37,
  twitter: '',
  username: 'testUsername',
  website: '',
});

export const seed = async (knex: Knex) => {
  const fakeUsers = [];

  // testUser === user info for admin account
  fakeUsers.push(await createTestUser());

  for await (const _ of range(1, 100)) {
    fakeUsers.push(await createUser());
  }

  // we delete all rows from our tables to get a clean slate
  // if a previous migration or seed ran and it errored, you might to reset
  // the knex migration history in order to run this script again
  await knex('users').del();
  await knex('users').insert(fakeUsers);
};
