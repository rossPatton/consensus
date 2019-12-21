import {CronJob} from 'cron';
import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';

import {knex} from '../../db/connection';

// do winner calculations first, then do 1 update

const getSimplePollWinners = (decision: tDecision): any => {
  loglevel.info('get simple poll / majority winners');
  return {...decision, finalWinners: {winners: []}};
};

const getApprovalWinners = (decision: tDecision): any => {
  loglevel.info('get approval winners');
  return {...decision, finalWinners: {winners: []}};
};

const getConsensusWinner = (decision: tDecision): any => {
  loglevel.info('get consensus winners');
  return {...decision, finalWinners: {winners: []}};
};

const decisionsWithFinalWinners = async (decisions: tDecision[]) => {
  return decisions.map(decision => {
    if (decision.type === 'Simple Poll') {
      return getSimplePollWinners(decision);
    } else if (decision.type === 'Simple Majority') {
      return getSimplePollWinners(decision);
    } else if (decision.type === 'Approval') {
      return getApprovalWinners(decision);
    } else if (decision.type === 'Consensus') {
      return getConsensusWinner(decision);
    }
  });
};

const closeDecisionsQuery = async (now: dayJS.Dayjs) => knex('decisions')
  .update({isClosed: true})
  // TODO remove comment below before going live
  .where({isClosed: false /* isDraft: false*/})
  .where('deadline', '<=', now)
  .returning('*');

const closeDecisions = async () => {
  let decisions: tDecision[];
  try {
    decisions = await closeDecisionsQuery(dayJS());
  } catch (err) {
    loglevel.error(err);
  }

  return decisions;
};

const query = async () => {
  const decisions = await closeDecisions();
  loglevel.info('decisions => ', decisions);
  return await decisionsWithFinalWinners(decisions);
};

export const closeOpenDecisions = () => {
  /* eslint-disable */
  new CronJob('* * * * * *', query, null, true, 'America/Los_Angeles');
};

