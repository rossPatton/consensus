import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const search = new Router();
const route = '/api/v1/search';
const table = 'orgs';

// post new rsvp for the logged in user, by eventId
search.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});

  let orgsLike: tOrg[];
  try {
    orgsLike = await knex(table)
      // TODO implement fuzzy matching
      .where('name', 'ilike', `%${query.value}%`)
      .limit(100);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (orgsLike instanceof Array && orgsLike.length === 0) {
    ctx.status = 204;
  }

  ctx.body = orgsLike;
});
