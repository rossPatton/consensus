import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const search = new Router();
const route = '/api/v1/search';
const table = 'groups';

// searching is a little different from a standard group fetch
// uses a postgres extension to do fuzzy matching
search.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = ctx?.state?.locals?.data;
  await validateSchema(ctx, schema, query);

  let groupsLike: {rows: ts.group[]};
  try {
    // get all columns, for rows in group whose name is similar to search term
    // then sort desc by that similarity/sml (closest first)
    groupsLike = await knex.raw(`
      SELECT *, similarity(${query.key}, '${query.value}') AS sml
      FROM ${table}
      WHERE ${query.key} % '${query.value}'
      ORDER BY sml DESC;
    `);
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (groupsLike.rows instanceof Array
      && groupsLike.rows.length === 0) {
    ctx.status = 204;
  }

  ctx.body = groupsLike.rows.filter(group => group.type !== 'hidden');
});
