require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createRelation = async (accountId: number, orgId: number) => {
  let role = faker.random.boolean() ? 'member' : 'facilitator';
  if (accountId === 101) { // test org admin
    role = 'admin';
  } else if (accountId === 100) { // test user facilitator
    role = 'facilitator';
  }

  return {
    accountId,
    orgId,
    role,
    userId: accountId === 101 ? null : accountId,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeRelations = [];

  for await (const accountId of range(99, true)) {
    for await (const orgId of range(100, true)) {
      fakeRelations.push(await createRelation(accountId, orgId));
    }
  }

  // create test user facilitator account
  fakeRelations.push(await createRelation(100, 100));

  // create test org admin account
  fakeRelations.push(await createRelation(101, 100));

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeRelations);
};
