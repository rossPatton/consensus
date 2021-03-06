import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '~app/redux/store';

import {getSession} from './queries';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // build our session if authenticated
  let store = {};
  if (ctx.isAuthenticated()) {
    const session = await getSession(ctx);
    store = {session};
  }

  // generate initial state for Redux store, with defaults + session if applicable
  return initStore(store);
};
