import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const search = new Router();

// searching is a little different from a standard group fetch
// uses a postgres extension to do fuzzy matching
search.get('/api/v1/search', async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema(ctx, schema, query);

  // @TODO set groups as default, allow passing in custom table to query
  const table = 'groups';
  let groupsLike: {rows: ts.group[]};
  try {
    // get all columns, for rows in group whose name is similar to search term
    // then sort desc by that similarity/sml (closest first)
    groupsLike = await pg.raw(`
      SELECT *, similarity(${query.key}, '${query.value}') AS sml
      FROM ${table}
      WHERE ${query.key} % '${query.value}'
      ORDER BY sml DESC;
    `);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = groupsLike.rows.filter(group => group.type !== 'hidden');
});
