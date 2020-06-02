import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '../redux/store';
import {getSession} from './queries';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passportSession = await ctx.redis.get(ctx.session._sessCtx.externalKey);
  // get user/org account. this object is determined by our serialization strategy
  const account = passportSession?.passport?.user || {};
  // take all that and build our session
  let store = {};
  if (account.id) {
    const session = await getSession(ctx, account);
    store = {session};
  }
  // generate initial state for Redux store, with defaults + session if applicable
  return initStore(store);
};