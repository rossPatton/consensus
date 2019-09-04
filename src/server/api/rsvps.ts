import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const rsvps = new Router();
const route = '/api/v1/rsvps';
const table = 'users_events';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  let body: tRSVP[];
  try {
    body = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (body instanceof Array && body.length === 0) {
    return ctx.throw(204);
  }

  ctx.body = body;
});

