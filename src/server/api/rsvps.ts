import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {getRSVPsByUserId} from '../queries';

export const rsvps = new Router();
const route = '/api/v1/rsvps';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.userId', 0);
  const rsvps = await getRSVPsByUserId(ctx, userId);

  if (rsvps instanceof Array && rsvps.length === 0) {
    ctx.status = 204;
  }

  ctx.body = rsvps;
});

