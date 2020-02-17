import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { schema } from './_schema';

export const search = new Router();
const route = '/api/v1/search';
const table = 'orgs';

// searching is a little different from a standard orgs fetch
// uses a postgres extension to do fuzzy matching
search.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});

  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
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

  if (orgsLike.rows instanceof Array
      && orgsLike.rows.length === 0) {
    ctx.status = 204;
  }

  ctx.body = orgsLike.rows.filter(org => org.type !== 'invite');
});
