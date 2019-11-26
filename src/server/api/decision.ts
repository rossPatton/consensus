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

decision.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const {isFormSubmit, isPrivate, ...newDecision} = data;

  // should be a comma delimited string, but you never know
  // db expects an object. arrays are a bit difficult with pg so we do it this way
  if (typeof newDecision.options === 'string') {
    newDecision.options = {
      list: newDecision.options.split(','),
    };
  }

  console.log('decision post => ', newDecision);

  let decisionQuery: tDecision[];
  try {
    decisionQuery = await knex('decisions').insert(newDecision).returning('*');
    ctx.body = decisionQuery[0];
  } catch (err) {
    ctx.throw(400, err);
  }
});

