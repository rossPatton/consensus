require('dotenv-safe').config();
import bcrypt from 'bcryptjs';
import faker from 'faker';
import Knex from 'knex';
import {range} from 'lodash';

import {encrypt} from '../../utils/crypto';
import {sha384} from '../../utils/sha';

// in production, salt would be generated per hash, but this saves time
const salt = bcrypt.genSaltSync(12);

const createUserAccount = async (i: number) => {
  const sha = sha384(faker.internet.password());
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    login: faker.internet.userName(),
    password,
    privateEmail: faker.random.boolean(),
    userId: i,
  };
};

const createTestUserAccount = async () => {
  const sha = sha384('testtesttest');
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    login: 'testAccount',
    password,
    privateEmail: faker.random.boolean(),
    userId: 1,
  };
};

const createTestGroupAccount = async () => {
  const sha = sha384('testtesttest');
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    login: 'twcNYC',
    groupId: 1,
    privateEmail: faker.random.boolean(),
    password,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeAccounts = [];

  fakeAccounts.push(await createTestUserAccount());
  fakeAccounts.push(await createTestGroupAccount());

  for await (const i of range(3, 100)) {
    fakeAccounts.push(await createUserAccount(i));
  }

  await knex('accounts').del();
  await knex('accounts').insert(fakeAccounts);
};
