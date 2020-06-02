import Knex from 'knex';
import {range} from 'lodash';

const createUserInviteRelation = async (groupId: number, userId: number) => ({
  groupId,
  userId,
});

exports.seed = async (knex: Knex) => {
  const fakeInvites = [];

  for await (const g of range(2, 10)) {
    for await (const u of range(1, 10)) {
      fakeInvites.push(await createUserInviteRelation(g, u));
    }
  }

  await knex('users_invites').del();
  await knex('users_invites').insert(fakeInvites);
};
