import Koa from 'koa';
import _ from 'lodash';
import { initStore } from '../redux/store';
import { knex } from './db/connection';

// in order to sync our server/client sessions, we have to initalize here
// pull out passport session info, use to populate the `auth` and `session` state
export const initStoreForSSR = async (ctx: Koa.ParameterizedContext) => {
  // get authentication status + active session data
  const passport = ctx.redis.get(ctx.session._sessCtx.externalKey);

  // get user/org session. this object is determined by our serialization strategy
  const passportSession = _.get(passport, 'passport.user', {});

  // TODO we have to do this currently in a couple places - consolidate
  let roles = null;
  let rsvps = null;
  if (passportSession.id) {
    const userOrgRels = await knex('users_orgs').where({userId: passportSession.id});
    roles = userOrgRels.map((rel: tUserOrgRelation) => ({
      orgId: rel.orgId,
      role: rel.role,
    }));

    const userEventRels = await knex('users_events').where({userId: passportSession.id});

    rsvps = userEventRels.map((rel: tUserEventRelation) => ({
      eventId: rel.eventId,
      status: {
        didAttend: rel.didAttend,
        isGoing: rel.isGoing,
      },
    }));
  }

  // verify authentication
  const isAuthenticated = ctx.isAuthenticated();
  // const lastActive = knex.fn.now();

  // initialize auth state using our thunk pattern
  const session = {
    error: null,
    isLoading: false,
    data: {
      ...passportSession,
      isAuthenticated,
      // lastActive,
      roles,
      rsvps,
    },
  };

  // generate the initial state from our Redux store, with our new defaults
  return initStore({session});
};
