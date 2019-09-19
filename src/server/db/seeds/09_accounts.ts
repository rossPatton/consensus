require('dotenv').config();
import bcrypt from 'bcryptjs';
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';
import {encrypt, sha384} from '../../utils';

// in production, salt would be generated per hash, but this saves time
const salt = bcrypt.genSaltSync(10);

const createUserAccount = async (i: number) => {
  const sha = sha384(faker.internet.password());
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    isVerified: faker.random.boolean(),
    login: faker.internet.userName(),
    password,
    userId: i,
  };
};

const createTestUserAccount = async () => {
  const sha = sha384('test');
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    isVerified: true,
    login: 'testAccount',
    password,
    userId: 100,
  };
};

const createTestOrgAccount = async () => {
  const sha = sha384('test');
  const saltedHash = await bcrypt.hash(sha, salt);
  const password = encrypt(saltedHash);

  return {
    isVerified: true,
    login: 'twcNYC',
    orgId: 100,
    password,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeAccounts = [];

  for await (const i of range(99, true)) {
    fakeAccounts.push(await createUserAccount(i));
  }

  fakeAccounts.push(await createTestUserAccount());
  fakeAccounts.push(await createTestOrgAccount());

  await knex('accounts').del();
  await knex('accounts').insert(fakeAccounts);
};
