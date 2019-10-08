require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createUserEventRelation = async (u: number, e: number) => {
  const publicRSVP = faker.random.boolean();

  return {
    eventId: e,
    publicRSVP,
    privateRSVP: !publicRSVP,
    userId: u,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeUserEventRelations = [];

  for await (const i of range(99, true)) {
    fakeUserEventRelations.push(await createUserEventRelation(100, i));
  }

  await knex('users_events').del();
  await knex('users_events').insert(fakeUserEventRelations);
};
