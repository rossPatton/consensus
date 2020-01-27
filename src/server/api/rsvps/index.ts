import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { schema } from './_schema';
import { getRSVPsByUserId } from './queries';

export const rsvps = new Router();
const route = '/api/v1/rsvps';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  // state.user === account
  const userId = _.get(ctx, 'state.user.userId', 0);

  try {
    await schema.validateAsync<{userId: number}>({userId});
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  const rsvps = await getRSVPsByUserId(ctx, userId);

  if (rsvps instanceof Array && rsvps.length === 0) {
    ctx.status = 204;
  }

  ctx.body = rsvps;
});

