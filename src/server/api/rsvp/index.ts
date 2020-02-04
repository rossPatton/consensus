import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { postSchema } from './_schema';

export const rsvp = new Router();
const route = '/api/v1/rsvp';
const table = 'users_events';
const dataPath = 'state.locals.data';

// post new rsvp for the logged in user, by eventId
// this is an upsert basically, post if new, patch if not
// TODO we should handle this on the client as well, since most of the time
// users will have javascript enabled, so no point in doing the additional query
rsvp.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});

  try {
    await postSchema.validateAsync({query});
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  const {eventId, type = 'private', value = 'false'} = query;
  const userId = _.get(ctx, 'state.user.userId', 0);
  const rsvp = value === 'true';
  const publicRSVP = type !== 'private' && rsvp;
  const privateRSVP = type === 'private' && rsvp;

  const newRsvp: tRSVP = {
    eventId,
    publicRSVP,
    privateRSVP,
    userId,
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
