require('dotenv-safe').config();
import faker from 'faker';
import Knex from 'knex';

import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';
const SIMPLE_POLL = 'Simple Poll';
const SIMPLE_MAJORITY = 'Simple Majority';
const APPROVAL = 'Approval';
const types = [SIMPLE_POLL, SIMPLE_MAJORITY, APPROVAL];

const createDecision = async () => {
  const type = types[getRandomNum(0, 2)];
  const isClosed = faker.random.boolean();

  let list = ['Yes', 'No', 'Abstain'];
  if (type === APPROVAL) {
    list = [
      'Person A',
      'Person B',
      'Person C',
      'Person D',
      'Person E',
      'Person F',
      'Person G',
    ];
  }

  let data = {
    results: {
      yes: faker.random.number(),
      no: faker.random.number(),
      abstain: faker.random.number(),
    },
  };

  if (type === APPROVAL) {
    data = {
      winners: 5,
      // @ts-ignore
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
  }

  return {
    data,
    deadline: faker.date.future(),
    description: faker.lorem.paragraphs(),
    isClosed,
    options: {list},
    orgId: 100,
    orgName: 'Tech Workers Coalition NYC',
    title: faker.company.bs(),
    type,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeDecisions = [];

  for await (const _ of range(100, true)) {
    fakeDecisions.push(await createDecision());
  }

  await knex('decisions').del();
  await knex('decisions').insert(fakeDecisions);
};
