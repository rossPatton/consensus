import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const search = new Router();
const route = '/api/v1/search';
const table = 'orgs';

// searching is a little different from a standard orgs fetch
// uses a postgres extension to do fuzzy matching
search.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});
  await validateSchema(ctx, schema, query);

  let orgsLike: {rows: tGroup[]};
  try {
    // get all columns, for rows in orgs whose name is similar to search term
    // then sort desc by that similarity/sml (closest first)
    orgsLike = await knex.raw(`
      SELECT *, similarity(${query.key}, '${query.value}') AS sml
      FROM ${table}
      WHERE ${query.key} % '${query.value}'
      ORDER BY sml DESC;
    `);
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (orgsLike.rows instanceof Array
      && orgsLike.rows.length === 0) {
    ctx.status = 204;
  }

  ctx.body = orgsLike.rows.filter(org => org.type !== 'hidden');
});
