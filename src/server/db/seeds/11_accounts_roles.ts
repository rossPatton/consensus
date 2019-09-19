require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {notNull} from '../../../utils/notNull';
import {range} from '../../../utils/range';

const createAccountRoleRelation = async (accountId: number, orgId: number) => {
  const isMember = faker.random.boolean();

  // our test account ids
  const isTestUser = accountId === 100;
  const isTestOrg = accountId === 101;

  let role = isMember ? 'member' : null;
  if (isTestUser) {
    if (orgId === 100) role = 'facilitator';
    if (orgId !== 100) role = 'member';
  }
  if (isTestOrg) {
    if (orgId === 100) role = 'admin';
    if (orgId !== 100) role = null;
  }

  // if no role, dont create entry
  if (!role) return null;

  return {
    accountId,
    orgId,
    role,
  };
};

exports.seed = async (knex: Knex) => {
  let fakeUserOrgRelations = [];

  // our test setup has 101 accounts - 100 is test user, 101 is test org admin
  for await (const accountId of range(101, true)) {
    // 100 organizations that a user might have a role for. org admins are always admin
    for await (const orgId of range(100, true)) {
      fakeUserOrgRelations.push(await createAccountRoleRelation(accountId, orgId));
    }
  }

  fakeUserOrgRelations = fakeUserOrgRelations.filter(notNull);

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeUserOrgRelations);
};
