require('dotenv-safe').config();
import Knex from 'knex';

import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';

const createUserEventRelation = async (u: number, e: number) => {
  const value = ['yes', 'no', 'maybe', null][getRandomNum(0, 3)];

  return {
    eventId: e,
    type: 'private', // user rsvp type, not event type
    userId: u,
    value,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeUserEventRelations = [];

  for await (const i of range(50, true)) {
    fakeUserEventRelations.push(await createUserEventRelation(100, i));
  }

  await knex('users_events').del();
  await knex('users_events').insert(fakeUserEventRelations);
};
