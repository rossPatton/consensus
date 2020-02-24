import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { postSchema } from './_schema';

export const rsvp = new Router();
const route = '/api/v1/rsvp';
const table = 'users_events';
const dataPath = 'state.locals.data';

// @TODO not really in use, since rsvps is more practical
// perhaps remove?

// post new rsvp for the logged in user, by eventId
// this is an upsert basically, post if new, patch if not
rsvp.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, postSchema, query);

  const {eventId, type = 'private', value = 'no'} = query;
  const userId = _.get(ctx, 'state.user.userId', 0);

  const newRsvp: tRSVP = {
    eventId,
    type,
    userId,
    value,
  };

  let currentRSVPStatus = {} as tRSVP;
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
      const update: tRSVP[] = await knex(table)
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
      ctx.body = update[0];
    } catch (err) {
      return ctx.throw(400, err);
    }
  } else {
    try {
      const insert: tRSVP[] = await knex(table)
        .insert(newRsvp)
        .returning('*');
      ctx.body = insert[0];
    } catch (err) {
      ctx.throw(400, err);
    }
  }
});
