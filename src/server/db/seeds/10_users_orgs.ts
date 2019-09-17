require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {notNull} from '../../../utils/notNull';
import {range} from '../../../utils/range';

const createUserOrgRelation = async (userId: number, orgId: number) => {
  const isMember = faker.random.boolean();
  const isTestAdmin = userId === 100 && orgId === 100;

  let role = isMember ? 'member' : null;
  if (isTestAdmin) role = 'admin';

  // if no role, dont create entry
  if (!role) return null;

  return {
    userId,
    orgId,
    role,
  };
};

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
