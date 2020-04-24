require('dotenv-safe').config();
import Knex from 'knex';
import {range} from 'lodash';

import {getRandomNum} from '../../../utils/getRandomNum';
const roles = ['member', 'pending', 'facilitator'];

const createRelation = async (accountId: number, groupId: number) => {
  let role = roles[getRandomNum(0, roles.length - 1)];
  if (accountId === 101) { // test group admin
    role = 'admin';
  } else if (accountId === 100) { // test user facilitator
    role = 'facilitator';
  }

  return {
    accountId,
    groupId,
    role,
    userId: accountId === 101 ? null : accountId,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeRelations = [];

  for await (const accountId of range(1, 99)) {
    for await (const groupId of range(1, 100)) {
      fakeRelations.push(await createRelation(accountId, groupId));
    }
  }

  // create test user facilitator account
  fakeRelations.push(await createRelation(100, 1));

  // create test group admin account
  fakeRelations.push(await createRelation(101, 1));

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeRelations);
};
