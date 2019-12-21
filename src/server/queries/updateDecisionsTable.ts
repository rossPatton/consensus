import Koa from 'koa';
import _ from 'lodash';

import { knex } from '../db/connection';

export const updateDecisionsTable = async (
  ctx: Koa.ParameterizedContext,
  userDecision: any): Promise<tDecision> => {
  const {vote = []} = userDecision.data;

  // get data in main decision column
  let decisionGetQuery: tDecision;
  try {
    decisionGetQuery = await knex('decisions')
      .limit(1)
      .first()
      .where({id: userDecision.decisionId});
  } catch (err) {
    ctx.throw(400, err);
  }

  const resultsBeforeVote = _.get(decisionGetQuery, 'results', {});

  const resultsAfterVote = {...resultsBeforeVote};
  vote.map((v: string) => (resultsAfterVote[v] += 1));

  // update data in main decision column for later use
  let decisionUpdateQuery: tDecision;
  try {
    decisionUpdateQuery = await knex('decisions')
      .where({id: userDecision.decisionId})
      .update('results', resultsAfterVote);
  } catch (err) {
    ctx.throw(400, err);
  }

  return decisionUpdateQuery;
};
