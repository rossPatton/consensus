require('dotenv-safe').config();
import dayJS from 'dayjs';
import faker from 'faker';
import Knex from 'knex';
import {range} from 'lodash';

import {getRandomNum} from '../../../utils/getRandomNum';

const CONSENSUS = 'Consensus';
const SIMPLE_POLL = 'Simple Poll';
const SIMPLE_MAJORITY = 'Simple Majority';
const APPROVAL = 'Approval';
const types = [CONSENSUS, SIMPLE_POLL, SIMPLE_MAJORITY, APPROVAL];

const createDecision = async () => {
  const type = types[getRandomNum(0, 3)];

  let options: any = {
    Yes: faker.random.number(),
    No: faker.random.number(),
    Abstain: faker.random.number(),
  };
  if (type === APPROVAL) {
    options = {
      'Person A': faker.random.number(),
      'Person C': faker.random.number(),
      'Person D': faker.random.number(),
      'Person E': faker.random.number(),
      'Person F': faker.random.number(),
      'Person G': faker.random.number(),
    };
  } else if (type === SIMPLE_MAJORITY) {
    options = {
      'Candidate A': 100,
      'Candidate B': 73,
      'Candidate C': 47,
      'Candidate D': 12,
    };
  } else if (type === CONSENSUS) {
    const decisionBlocked = faker.random.boolean();
    const Block = decisionBlocked ? faker.random.number() : 0;
    options = {
      decisionBlocked,
      Agree: faker.random.number(),
      Disagree: faker.random.number(),
      Abstain: faker.random.number(),
      Block,
    };
  }

  const deadline = faker.random.boolean() ? faker.date.past() : faker.date.future();
  const isClosed = dayJS(deadline).isBefore(dayJS());
  let potentialWinners = 1;
  if (type === APPROVAL) {
    potentialWinners = getRandomNum(1, 3);
  }

  return {
    data: {options},
    deadline,
    description: faker.lorem.paragraphs(),
    isClosed,
    isDraft: false,
    orgId: 100,
    orgName: 'Tech Workers Coalition NYC',
    potentialWinners,
    title: faker.company.bs(),
    type,
  };
};

exports.seed = async (knex: Knex) => {
  const fakeDecisions = [];

  for await (const _ of range(1, 100)) {
    fakeDecisions.push(await createDecision());
  }

  await knex('decisions').del();
  await knex('decisions').insert(fakeDecisions);
};
