require('dotenv-safe').config();
import Knex from 'knex';
import {range} from 'lodash';

import {getRandomNum} from '../../../utils/getRandomNum';
const roles = ['member', 'pending', 'facilitator'];

const createRelation = async (accountId: number, groupId: number) => {
  let role = roles[getRandomNum(0, roles.length - 1)];
  if (accountId === 1) { // test user facilitator
    role = 'facilitator';
  } else if (accountId === 2) { // test group admin
    role = 'admin';
  }

  return {
    accountId,
    groupId,
    role,
    userId: accountId === 2 ? null : accountId,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeRelations = [];

  // create test user facilitator account
  fakeRelations.push(await createRelation(1, 1));

  // create test group admin account
  fakeRelations.push(await createRelation(2, 1));

  for await (const accountId of range(3, 100)) {
    for await (const groupId of range(1, 100)) {
      fakeRelations.push(await createRelation(accountId, groupId));
    }
  }

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeRelations);
};
