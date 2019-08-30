import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '../db/connection';

export const usersByOrg = new Router();

const getUsers = async (ctx: Koa.ParameterizedContext, mappedIds: number[]) => {
  const { query }: tIdQueryServer = ctx;
  const { limit, offset } = query;

  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  const users = knex('users').whereIn('id', mappedIds);

  if (parsedLimit > 0) users.limit(parsedLimit);
  if (parsedOffset > 0) users.offset(parsedOffset);

  return users;
};

// @ts-ignore
usersByOrg.get('usersByOrg', '/api/v1/usersByOrg', async (ctx: Koa.Context) => {
  try {
    const { query }: tIdQueryServer = ctx;
    const { id: orgId } = query;

    // use 3rd table to get relation between users and organization
    const userIds: tUserOrgRelation[] = await knex('users_orgs').where({orgId});

    // userIds here are ALL ids, but we limit by default to 10 at a time by default
    const mappedIds = userIds.map(idSet => idSet.userId);

    // use the returned ids to query users table
    const users: tUser[] = await getUsers(ctx, mappedIds);
    const usersByOrg: tUsersByOrg = {
      userTotal: mappedIds.length,
      users,
    };

    ctx.body = usersByOrg;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// @ts-ignore
usersByOrg.post('usersByOrg', '/api/v1/usersByOrg', async (ctx: Koa.Context) => {
  try {
    const userId = ctx.state.user.id;
    const {data} = ctx.locals.state;
    const {id: orgId} = data;

    // use 3rd table to get relation between users and organization
    const userIds: tUserOrgRelation[] = await knex('users_orgs').where({orgId});
    console.log('userIds => ', userIds);
    console.log('userId => ', userId);

    ctx.body = {ok: true};
  } catch (err) {
    ctx.throw('400', err);
  }
});
