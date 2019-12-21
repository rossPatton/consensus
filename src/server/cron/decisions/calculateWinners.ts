import {CronJob} from 'cron';
import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';

import {knex} from '../../db/connection';

const closeOpenDecisions = async (now: dayJS.Dayjs) => knex('decisions')
  .update({isClosed: true})
  .where({isClosed: false, isDraft: false})
  .where('deadline', '<=', now)
  .returning('*');

const query = async () => {
  let decisions: tDecision[];
  try {
    decisions = await closeOpenDecisions(dayJS());
  } catch (err) {
    loglevel.error(err);
  }

  return decisions;
};

export const calculateWinners = () => {
  /* eslint-disable */
  new CronJob('1 * * * * *', query, null, true, 'America/Los_Angeles');
};

