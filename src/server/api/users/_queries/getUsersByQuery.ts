import Koa from 'koa';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';

import {userKeys} from '../../_constants';

export const getUsersByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any,
): Promise<ts.user[]> => {
  console.log('get users query => ', query);

  const {
    exclude: excludeId,
    ids: idsStr,
    limit: limitStr,
    offset: offsetStr,
    ...restOfQuery
  } = query;

  console.log('query.ids => ', typeof query.ids, query.ids instanceof Array, query.ids);

  try {
    const users = pg('users').where(restOfQuery);

    // if we're excluding a specific user
    if (excludeId) users.whereNot({id: excludeId});

    // if selecting a specific list of users
    if (idsStr) {
      const idsAsArray = idsStr.split(',');
      console.log('idsAsArray => ', idsAsArray);
      users.whereIn('id', idsAsArray);
    }

    const parsedLimit = limitStr ? parseInt(limitStr as string, 10) : 3;
    const parsedOffset = offsetStr ? parseInt(offsetStr as string, 10) : 0;
    if (parsedLimit > 0) users.limit(parsedLimit);
    if (parsedOffset > 0) users.offset(parsedOffset);

    return users.select(userKeys);
  } catch(err) {
    return ctx.throw(500, err);
  }
};
