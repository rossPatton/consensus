require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {notNull} from '../../../utils/notNull';
import {range} from '../../../utils/range';

const createRelation = async (accountId: number, orgId: number) => ({
  accountId,
  orgId,
  role: faker.random.boolean() ? 'member' : 'facilitator',
  userId: accountId,
});

exports.seed = async (knex: Knex) => {
  const fakeRelations = [];

  for await (const accountId of range(100, true)) {
    for await (const orgId of range(100, true)) {
      fakeRelations.push(await createRelation(accountId, orgId));
    }
  }

  await knex('accounts_roles').del();
  await knex('accounts_roles').insert(fakeRelations);
};
