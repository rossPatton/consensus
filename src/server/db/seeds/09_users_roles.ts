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
    groupId,
    role,
    userId: accountId === 2 ? null : accountId,
  };
};

export const seed = async (knex: Knex) => {
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

  await knex('users_roles').del();
  await knex('users_roles').insert(fakeRelations);
};
