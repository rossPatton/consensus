require('dotenv-safe').config();
// import dayJS from 'dayjs';
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
  const type = types[getRandomNum(0, 3)];

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

  let winners = ['Yes'];
  if (type === APPROVAL) {
    winners = [
      'Person A',
      'Person C',
      'Person D',
      'Person E',
      'Person F',
    ];
  } else if (type === SIMPLE_MAJORITY) {
    winners = [
      /* eslint-disable-next-line */
      'Candidate A',
    ];
  } else if (type === CONSENSUS) {
    winners = [
      'Disagree',
    ];
  }

  let results: any = {
    Yes: faker.random.number(),
    No: faker.random.number(),
    Abstain: faker.random.number(),
  };

  if (type === APPROVAL) {
    results = {
      'Person A': faker.random.number(),
      'Person C': faker.random.number(),
      'Person D': faker.random.number(),
      'Person E': faker.random.number(),
      'Person F': faker.random.number(),
      'Person G': faker.random.number(),
    };
  } else if (type === SIMPLE_MAJORITY) {
    results = {
      'Candidate A': 100,
      'Candidate B': 73,
      'Candidate C': 47,
      'Candidate D': 12,
    };
  } else if (type === CONSENSUS) {
    const decisionBlocked = faker.random.boolean();
    const Block = decisionBlocked ? faker.random.number() : 0;
    results = {
      decisionBlocked,
      Agree: faker.random.number(),
      Disagree: faker.random.number(),
      Abstain: faker.random.number(),
      Block,
    };
  }

  const deadline = faker.date.past();
  // faker.random.boolean() ? faker.date.past() : faker.date.future();
  const isClosed = false; // dayJS(deadline).isBefore(dayJS());

  return {
    deadline,
    description: faker.lorem.paragraphs(),
    isClosed,
    isDraft: !isClosed && faker.random.boolean(),
    finalWinners: {winners},
    options: {list},
    orgId: 100,
    orgName: 'Tech Workers Coalition NYC',
    potentialWinners: winners.length,
    results,
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
