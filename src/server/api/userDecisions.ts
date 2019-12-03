import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const userDecisions = new Router();
const route = '/api/v1/userDecisions';
const table = 'users_decisions';

// for voting, basically
userDecisions.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {data: vote, decisionId, userId} = _.get(ctx, 'state.locals.data', {});

  let decisionQuery: tDecision[];
  try {
    decisionQuery = await knex(table)
      .where({decisionId, userId})
      .update({data: { vote }})
      .returning('*');

    ctx.body = {
      result: decisionQuery[0],
      success: true,
    };
  } catch (err) {
    ctx.throw(400, err);
  }
});
