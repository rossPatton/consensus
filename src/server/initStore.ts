import Koa from 'koa';
import _ from 'lodash';
import { initStore } from '../redux/store';
import { knex } from './db/connection';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);

  // get user/org session. this object is determined by our serialization strategy
  const passportSession = _.get(passport, 'passport.user', {});
  let roles = null;

  if (passportSession.id) {
    const userOrgRels = await knex('users_orgs').where({userId: passportSession.id});
    roles = userOrgRels.map((userOrgRel: tUserOrgRelation) => ({
      orgId: userOrgRel.orgId,
      role: userOrgRel.role,
    }));
  }

  // verify authentication
  const isAuthenticated = ctx.isAuthenticated();

  // initialize auth state using our thunk pattern
  const session = {
    ...passportSession,
    isAuthenticated,
    roles,
  };

  // generate the initial state from our Redux store, with our new defaults
  return initStore({ session });
};
