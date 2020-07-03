import Koa from 'koa';
import Router from 'koa-router';

// import {validateSchema} from '~app/server/utils';

import {getUsersByQuery} from './_queries';
// import {getSchema,} from './_schema';
// import {tUserByOrgQuery} from './_types';

export const users = new Router();
const route = '/api/v1/users';

/*
  @description get list of users that belong to a group, zipped with their roles
*/
users.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.usersQuery} = ctx;
  // await validateSchema<ts.usersByGroupIdQuery>(ctx, getSchema, query);
  const users = await getUsersByQuery(ctx, query);
  ctx.body = users;
});
