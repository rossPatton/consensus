import Koa from 'koa';
import _ from 'lodash';

import {initStore} from '../redux/store';
import {knex} from './db/connection';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);

  // get user/org session. this object is determined by our serialization strategy
  const accountSession = _.get(passport, 'passport.user', {});

  // TODO consolidate this and other query logic in a queries folder
  const {orgId, userId} = accountSession;
  let profile: any;
  if (orgId) {
    try {
      profile = await knex('orgs').limit(1).where({id: orgId}).first();
    } catch (err) {
      ctx.throw(400, err);
    }
  } else if (userId) {
    try {
      profile = await knex('users').limit(1).where({id: userId}).first();
    } catch (err) {
      ctx.throw(400, err);
    }
  }

  let roleRows: tRoleMap[];
  try {
    roleRows = await knex('accounts_roles').where({accountId: accountSession.id});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // newSession === session.data on the client, redux adds loading/error keys
  const newSession: tSession = {
    ...profile,
    isAuthenticated: ctx.isAuthenticated(),
    type: orgId ? 'org' : 'user',
  };

  // initialize auth state using our thunk pattern
  const session = {
    error: null,
    isLoading: false,
    data: newSession,
  };

  const roles = {
    error: null,
    isLoading: false,
    data: roleRows,
  };

  // generate the initial state from our Redux store, with our new defaults
  return initStore({roles, session});
};
