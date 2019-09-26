import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const rsvp = new Router();
const route = '/api/v1/rsvp';
const table = 'users_events';

// post new rsvp for the logged in user, by eventId
rsvp.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {id = 0, value} = _.get(ctx, 'state.locals.data', {});
  const userId = _.get(ctx, 'state.user.userId', 0);
  const eventId = parseInt(id, 10);

  const newRsvp: tRSVP = {
    eventId,
    rsvp: value === 'true',
    userId,
  };

  let currentRSVPStatus: tRSVP;
  try {
    currentRSVPStatus = await knex(table)
      .limit(1)
      .where({eventId, userId})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  // TODO reduce branches or just simplify somehow
  // update existing event or insert new users_events relation
  if (currentRSVPStatus) {
    try {
      const update = await knex(table)
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
      ctx.body = update[0];
    } catch (err) {
      return ctx.throw(400, err);
    }
  } else {
    try {
      const insert = await knex(table)
        .insert(newRsvp)
        .returning('*');
      ctx.body = insert[0];
    } catch (err) {
      ctx.throw(400, err);
    }
  }
});
