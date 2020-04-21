require('dotenv-safe').config();
import Knex from 'knex';
import {range} from 'lodash';

const createUserDecisionRelation = async (i: number) => ({
  decisionId: i,
  userId: 100,
});

exports.seed = async (knex: Knex) => {
  const fakeUserDecisionRelations = [];

  for await (const i of range(1, 100)) {
    fakeUserDecisionRelations.push(await createUserDecisionRelation(i));
  }

  await knex('users_decisions').del();
  await knex('users_decisions').insert(fakeUserDecisionRelations);
};
