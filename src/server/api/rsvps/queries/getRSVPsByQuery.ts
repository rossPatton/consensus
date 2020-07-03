import Koa from 'koa';

import {pg} from '~app/server/db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRSVPsByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any): Promise<ts.rsvp[]> => {

  let rsvps = pg('users_meetings');
  try {
    if (query.value === 'yesmaybe') {
      const {value, ...where} = query;
      rsvps = rsvps.where(where)
        .andWhereNot({value: 'no'});
    } else {
      rsvps = rsvps.where(query);
    }

  } catch (err) {
    return ctx.throw(500, err);
  }

  return rsvps;
};
