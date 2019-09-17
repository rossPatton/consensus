require('dotenv').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';

const createDecision = async (i: number) => {
  const type = i % 2 === 0 ? 'Simple Majority' : 'Approval';
  const data = type === 'Simple Majority'
    ? {
      yes: faker.random.number(),
      no: faker.random.number(),
      abstain: faker.random.number(),
    }
    : {
      winners: 5,
      choices: [
        {
          count: faker.random.number(),
          label: 'person A',
        },
        {
          count: faker.random.number(),
          label: 'person B',
        },
        {
          count: faker.random.number(),
          label: 'person C',
        },
        {
          count: faker.random.number(),
          label: 'person D',
        },
        {
          count: faker.random.number(),
          label: 'person E',
        },
        {
          count: faker.random.number(),
          label: 'person F',
        },
        {
          count: faker.random.number(),
          label: 'person G',
        },
      ],
    };

  return {
    data,
    date: faker.date.past(),
    description: faker.lorem.paragraphs(),
    orgId: 100,
    title: faker.company.bs(),
    type,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeDecisions = [];

  for await (const i of range(100, true)) {
    fakeDecisions.push(await createDecision(i));
  }

  await knex('decisions').del();
  await knex('decisions').insert(fakeDecisions);
};
