require('dotenv-safe').config();
import dayJS from 'dayjs';
import faker from 'faker';
import Knex from 'knex';

import {getRandomNum} from '../../../utils/getRandomNum';
import {range} from '../../../utils/range';

const CONSENSUS = 'Consensus';
const SIMPLE_POLL = 'Simple Poll';
const SIMPLE_MAJORITY = 'Simple Majority';
const APPROVAL = 'Approval';
const types = [CONSENSUS, SIMPLE_POLL, SIMPLE_MAJORITY, APPROVAL];

const createDecision = async () => {
  const type = types[getRandomNum(0, 2)];

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
  } else if (type === SIMPLE_MAJORITY) {
    list = [
      /* eslint-disable-next-line */
      'Candidate A',
      'Candidate B',
      'Candidate C',
      'Candidate D',
    ];
  } else if (type === CONSENSUS) {
    list = [
      'Agree',
      'Disagree',
      'Abstain',
      'Block',
    ];
  }

  let data: any = {
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
  } else if (type === SIMPLE_MAJORITY) {
    data = {
      winner: 'Candidate A',
      // @ts-ignore
      results: [
        {
          count: 100,
          label: 'Candidate A',
        },
        {
          count: 73,
          label: 'Candidate B',
        },
        {
          count: 47,
          label: 'Candidate C',
        },
        {
          count: 12,
          label: 'Candidate D',
        },
      ],
    };
  } else if (type === CONSENSUS) {
    const decisionBlocked = faker.random.boolean();
    const blocked = decisionBlocked ? faker.random.number() : 0;
    data = {
      decisionBlocked,
      results: {
        agree: faker.random.number(),
        disagree: faker.random.number(),
        abstain: faker.random.number(),
        blocked,
      },
    };
  }

  const deadline = faker.random.boolean() ? faker.date.past() : faker.date.future();
  const isClosed = dayJS(deadline).isBefore(dayJS());

  return {
    data,
    deadline,
    description: faker.lorem.paragraphs(),
    isClosed,
    isDraft: !isClosed && faker.random.boolean(),
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
