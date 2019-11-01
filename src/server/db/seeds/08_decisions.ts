require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {range} from '../../../utils/range';
const SIMPLE_MAJORITY = 'Simple Majority';
const APPROVAL = 'Approval';

const createDecision = async (i: number) => {
  const type = i % 2 === 0 ? SIMPLE_MAJORITY : APPROVAL;
  const isClosed = faker.random.boolean();

  const choices = type === SIMPLE_MAJORITY
    ? {choices: ['yes', 'no', 'abstain']}
    : {
      choices: [
        'Person A',
        'Person B',
        'Person C',
        'Person D',
        'Person E',
        'Person F',
        'Person G',
      ]};

  const data = type === SIMPLE_MAJORITY
    ? {
      results: {
        yes: faker.random.number(),
        no: faker.random.number(),
        abstain: faker.random.number(),
      },
    }
    : {
      winners: 5,
      results: [
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
    choices,
    data,
    date: faker.date.future(),
    description: faker.lorem.paragraphs(),
    endDate: faker.date.future(),
    isClosed,
    orgId: 100,
    orgName: 'Tech Workers Coalition NYC',
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
