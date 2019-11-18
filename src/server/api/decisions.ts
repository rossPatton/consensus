import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {utcToDateString} from '../../utils';
import {knex} from '../db/connection';

export const decisions = new Router();
type tQuery = {id: string, isClosed: boolean, limit: string, offset: string};

const getDecisions = async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  const {id, isClosed, limit, offset} = query as tQuery & {type: tDecisionType};

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  let decisions;
  try {
    decisions = knex('decisions')
      .where({isClosed, orgId})
      .orderBy('date', 'desc');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (parsedLimit > 0) decisions.limit(parsedLimit);
  if (parsedOffset > 0) decisions.offset(parsedOffset);
  return decisions;
};

decisions.get('/api/v1/decisions', async (ctx: Koa.ParameterizedContext) => {
  try {
    const decisions = await getDecisions(ctx);
    const decisionsWithMappedDates: tDecision[] = decisions.map(utcToDateString);
    ctx.body = decisionsWithMappedDates;
  } catch (err) {
    ctx.throw(400, err);
  }
});

