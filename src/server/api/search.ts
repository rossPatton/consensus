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

  if (!query.value) {
    ctx.status = 204;
    ctx.body = [];
  }

  let orgsLike: {rows: tOrg[]};
  try {
    // get all columns, for rows in orgs whose name is similar to search term
    // then sort desc by that similarity/sml (closest first)
    orgsLike = await knex.raw(`
      SELECT *, similarity(name, '${query.value}') AS sml
      FROM ${table}
      WHERE name % '${query.value}'
      ORDER BY sml DESC;
    `);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (orgsLike.rows instanceof Array && orgsLike.rows.length === 0) {
    ctx.status = 204;
  }

  ctx.body = orgsLike.rows;
});
