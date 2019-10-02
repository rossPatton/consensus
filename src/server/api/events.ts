import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { getDateNowAsISOStr, notNull } from '../../utils';
import { knex } from '../db/connection';

export const events = new Router();
const route = '/api/v1/events';
const table = 'events';
const state = 'state.locals.data';

// TODO simplify
const getEvents = async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const { exclude, id, limit, isPublic: isPublicStr, offset } = data;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  // by default, we only return upcoming events
  const events = knex(table);

  // if we're excluding events, do it up front
  if (exclude) {
    events.whereNot({id: exclude});
  }

  // if user isn't logged in or a member, only show public events
  const isPublic = isPublicStr === 'true';
  if (isPublic) events.where({isPrivate: false});

  events.where({orgId})
    .where('date', '>=', getDateNowAsISOStr())
    .orderBy('date', 'asc');

  if (parsedLimit > 0) events.limit(parsedLimit);
  if (parsedOffset > 0) events.offset(parsedOffset);

  return events;
};

// get multiple events at a time
events.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const account = _.get(ctx, 'state.user', 0);

  let events: tEvent[];
  try {
    events = await getEvents(ctx);
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {id, userId} = account;
  // get account role if logged in
  let accountRoleRel: tAccountRoleRelation;
  if (id) {
    try {
      accountRoleRel = await knex('accounts_roles')
        .limit(1)
      // data.id === orgId of the org being viewed on the client
        .where({accountId: id, orgId: parseInt(data.id, 10)})
        .first();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  const isAuthenticated = ctx.isAuthenticated();
  const role = _.get(accountRoleRel, 'role', null);

  const filteredEvents = events.map(ev => {
    if (ev.isPrivate || ev.isDraft) {
      // if private event or draft, and user is not logged in, hide
      if (!isAuthenticated) return null;
      // if private event or draft, user is logged in, but user is not a member, hide
      if (role === null) return null;
      // only facilitators and the org admin should see drafts
      if (ev.isDraft && role === 'member') return null;
    }

    return ev;
  }).filter(notNull);

  // if org admin account, no need to fetch rsvps
  if (!userId) {
    ctx.body = filteredEvents;
  } else {

    // if user account, fetch rsvps
    let userEventsRels: tUserEventRelation[];
    try {
      userEventsRels = await knex('users_events').where({userId});
    } catch (err) {
      return ctx.throw(400, err);
    }

    const eventsWithRSVPS = filteredEvents.map(ev => {
      const rsvpObj = _.find(
        userEventsRels,
        rel => rel.eventId === ev.id && rel.userId === userId,
      );

      const rsvp = (rsvpObj && rsvpObj.rsvp) || false;

      return {
        ...ev,
        rsvp,
      };
    });

    ctx.body = eventsWithRSVPS;
  }
});

events.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {id} = _.get(ctx, state, {});

  try {
    await knex(table)
      .limit(1)
      .where({id})
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {ok: true, id};
});
