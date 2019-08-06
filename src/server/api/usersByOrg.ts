import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

type tExpectedQuery = {
  query: {
    id: number,
    limit: number,
    offset: number,
  },
};

export const usersByOrg = new Router();

// @ts-ignore
usersByOrg.get('usersByOrg', '/api/v1/usersByOrg', async (ctx: Koa.Context) => {
  const { query }: tExpectedQuery = ctx;
  const { id: orgId, limit = 3, offset = 0 } = query;

  type tFusionTable = {
    id: number,
    orgId: number,
    role: 'member' | 'admin',
    userId: number,
  }

  // use 3rd table to get relation between users and organization
  const userIds: tFusionTable[] = await knex('users_orgs').where({ orgId });

  // userIds here are ALL ids, but we limit by default to 10 at a time by default
  const mappedIds = userIds.map(idSet => idSet.userId);

  // use the returned ids to query users table
  const users = await knex.select('*')
    .from('users')
    .whereIn('id', mappedIds)
    .limit(limit)
    .offset(offset);

  ctx.body = {
    userTotal: mappedIds.length,
    users,
  };
});
