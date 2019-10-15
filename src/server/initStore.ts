import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '../redux/store';
import {getSession} from './queries';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);
  // get user/org account. this object is determined by our serialization strategy
  const account = _.get(passport, 'passport.user', {});
  // take all that and build our session
  const session = await getSession(ctx, account);
  // generate initial state for Redux store, with defaults + session if applicable
  return initStore({session});
};
