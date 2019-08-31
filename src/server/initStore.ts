import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '../redux/store';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);

  // get user/org session. this object is determined by our serialization strategy
  const passportSession = _.get(passport, 'passport.user', {});

  // verify authentication
  const isAuthenticated = ctx.isAuthenticated();

  // initialize auth state using our thunk pattern
  const session = {
    error: null,
    isLoading: false,
    data: {
      ...passportSession,
      isAuthenticated,
    },
  };

  // generate the initial state from our Redux store, with our new defaults
  return initStore({session});
};
