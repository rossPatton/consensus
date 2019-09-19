require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {notNull} from '../../../utils/notNull';
import {range} from '../../../utils/range';

const createUserOrgRelation = async (userId: number, orgId: number) => ({
  userId,
  orgId,
});

exports.seed = async (knex: Knex) => {
  let fakeUserOrgRelations = [];

  for await (const userId of range(100, true)) {
    for await (const orgId of range(100, true)) {
      fakeUserOrgRelations.push(await createUserOrgRelation(userId, orgId));
    }
  }

  fakeUserOrgRelations = fakeUserOrgRelations.filter(notNull);

  await knex('users_orgs').del();
  await knex('users_orgs').insert(fakeUserOrgRelations);
};
