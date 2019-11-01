require('dotenv-safe').config();
import Knex from 'knex';

const createDecisionTypes = () => ([
  { type: 'Simple Majority' },
  { type: 'Approval' },
]);

exports.seed = async (knex: Knex) => {
  await knex('decision_types').del();
  await knex('decision_types').insert(createDecisionTypes());
};
