import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { utcToDateString } from '../../utils';

export const decisionsByOrg = new Router();

const getDecisions = async (ctx: Koa.Context) => {
  const {query}: tIdQueryServer = ctx;
  const {id, limit, offset} = query;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  let decisions;
  try {
    decisions = knex('decisions')
      .where({orgId})
      .orderBy('date', 'desc');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (parsedLimit > 0) decisions.limit(parsedLimit);
  if (parsedOffset > 0) decisions.offset(parsedOffset);

  return decisions;
};

// @ts-ignore
decisionsByOrg.get('decisions', '/api/v1/decisionsByOrg', async (ctx: Koa.Context) => {
  try {
    const decisions = await getDecisions(ctx);
    const decisionsWithMappedDates: tDecision[] = decisions.map(utcToDateString);
    ctx.body = decisionsWithMappedDates;
  } catch (err) {
    ctx.throw('400', err);
  }
});

