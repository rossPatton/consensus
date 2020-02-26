require('dotenv-safe').config();
import Knex from 'knex';

import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
const roles = ['member', 'pending', 'facilitator'];

const createRelation = async (accountId: number, orgId: number) => {
  let role = roles[getRandomNum(0, roles.length - 1)];
  if (accountId === 101) { // test group admin
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
  fakeRelations.push(await createRelation(100, 1));

  // create test org admin account
  fakeRelations.push(await createRelation(101, 1));

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeRelations);
};
