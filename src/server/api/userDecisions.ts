import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const userDecisions = new Router();
const route = '/api/v1/userDecisions';
const table = 'users_decisions';

const getDecisions = async ({decisionId, orgId, userId}: any) => {
  const votes = knex(table).where({userId});
  if (orgId) votes.where({orgId});
  if (decisionId) votes.where({id: decisionId});
  return votes;
};

userDecisions.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});

  try {
    const votes = await getDecisions(query);
    ctx.body = _.get(votes[0], 'data.vote', []);
  } catch (err) {
    ctx.throw(400, err);
  }
});

userDecisions.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {data, decisionId, userId} = _.get(ctx, 'state.locals.data', {});

  // should be a comma delimited string, but you never know
  // db expects an object. arrays are a bit difficult with pg so we do it this way
  // we accept both arrays of votes and single votes, but normalize to array
  const vote = data.includes(',') ? data.split(',') : [data];
  let decisionQuery: tDecision[];
  try {
    decisionQuery = await knex(table)
      .where({decisionId, userId})
      .update({data: { vote }})
      .returning('*');

    ctx.body = _.get(decisionQuery[0], 'data.vote', []);
  } catch (err) {
    ctx.throw(400, err);
  }
});
