import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getEventsByOrgId} from '../queries';
import {filterEvs4Client, zipEvsWithRSVPS} from '../utils'; // server only utils

export const events = new Router();
const route = '/api/v1/events';
const state = 'state.locals.data';
const table = 'events';

// get multiple events at a time
events.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const account = _.get(ctx, 'state.user', {});

  // get back events by orgId
  let events: tEvent[];
  try {
    events = await getEventsByOrgId(ctx);
  } catch (err) {
    return ctx.throw(400, err);
  }

  // get account role if logged in
  // if not logged in, we'll want to hide private events and drafts
  // if user is logged in but just a member, we want to hide drafts
  const {id: accountId} = account;
  let accountRoleRel = {} as tAccountRoleRelation;
  if (accountId) {
    try {
      accountRoleRel = await knex('accounts_roles')
        .limit(1)
      // data.id === orgId of the org being viewed on the client
        .where({accountId, orgId: parseInt(data.id, 10)})
        .first();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  let userEventRels = {} as tRSVP[];
  const mappedEventIds: number[] = events.map(ev => ev.id);
  try {
    userEventRels = await knex('users_events')
      .whereIn('eventId', mappedEventIds)
      .where({
        publicRSVP: true,
      })
      .orWhere({
        privateRSVP: true,
      });
  } catch (err) {
    return ctx.throw(400, err);
  }

  const isAuthenticated = ctx.isAuthenticated();
  const role = _.get(accountRoleRel, 'role', null);
  const filteredEvents: tEvent[] = await filterEvs4Client(events, isAuthenticated, role);
  const eventsWithAttendees = await Promise.all(
    filteredEvents.map(ev => {
      const attendees = [...userEventRels].filter(
        rel => rel.eventId === ev.id && (rel.privateRSVP || rel.publicRSVP),
      );

      return {
        ...ev,
        attendees: attendees.length,
      };
    })
  );

  // if org admin account, this just returns the events we've already fetched
  const eventsWithRSVPS = await zipEvsWithRSVPS(ctx, eventsWithAttendees);
  ctx.body = eventsWithRSVPS;
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
