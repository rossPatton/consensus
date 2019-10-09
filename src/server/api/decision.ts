import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

// import {utcToDateString} from '../../utils';
import {knex} from '../db/connection';

export const decision = new Router();
const route = '/api/v1/decision';

const getDecision = async (ctx: Koa.ParameterizedContext) => {
  const id = _.get(ctx, 'state.locals.data.id', 0);

  let decision: tDecision;
  try {
    decision = await knex('decisions')
      .limit(1)
      .where({id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  return decision;
};

decision.get(route, async (ctx: Koa.ParameterizedContext) => {
  try {
    const decision = await getDecision(ctx);
    // const decisionWithMappedDates: tDecision[] = decisions.map(utcToDateString);
    ctx.body = decision;
  } catch (err) {
    ctx.throw(400, err);
  }
});

