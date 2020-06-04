import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '../redux/store';
import {getSession} from './queries';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  const session = await getSession(ctx);

  // take all that and build our session
  let store = {};
  if (session?.data?.isAuthenticated) {
    store = {session};
  }

  // generate initial state for Redux store, with defaults + session if applicable
  return initStore(store);
};
