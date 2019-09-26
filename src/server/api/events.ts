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
  const { exclude, id, limit, isPublic, offset } = data;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  // by default, we only return upcoming events
  const events = knex(table);

  // if we're excluding events, do it up front
  if (exclude) events.whereNot({id: exclude});

  // if user isn't logged in, only get public events
  if (isPublic) events.whereNot({isPrivate: true});

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
  const userId = _.get(ctx, 'state.user.id', 0);
  const orgId = parseInt(data.id, 10);

  let events: tEvent[];
  try {
    events = await getEvents(ctx);
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userOrgRel: tAccountRoleRelation;
  try {
    userOrgRel = await knex('accounts_roles').limit(1).where({orgId}).first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userEventsRels: tUserEventRelation[];
  try {
    userEventsRels = await knex('users_events').where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  const isAuthenticated = ctx.isAuthenticated();
  ctx.body = events.map(ev => {
    if (ev.isPrivate) {
      // if private event, and user is not logged in, hide
      if (!isAuthenticated) return null;
      // if private event, user is logged in, but user is not a member, hide
      if (userOrgRel.role === null) return null;
    }

    if (ev.isDraft && !isAuthenticated) return null;

    const rsvpObj = _.find(
      userEventsRels,
      rel => rel.eventId === ev.id && rel.userId === userId,
    );

    const rsvp = (rsvpObj && rsvpObj.rsvp) || false;

    return {
      ...ev,
      rsvp,
    };
  }).filter(notNull);
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
