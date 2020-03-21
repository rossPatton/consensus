import dayJS from 'dayjs';
import Koa from 'koa';
import _ from 'lodash';

import {tEventsServerQuery} from '../_types';
import {knex} from '../../../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getEventsByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: tEventsServerQuery,
): Promise<tEvent[]> => {
  const {
    exclude: excludeId,
    isDraft: isDraftStr,
    limit: limitStr,
    offset: offsetStr,
    orgId,
    showPast: showPastStr,
  } = query;

  try {
    // by default, we only return upcoming events
    const events = knex('events');

    // if we're excluding events, do it up front
    if (excludeId) events.whereNot({id: excludeId});

    // if no showPast boolean, then return *only* upcoming events
    const showPast = showPastStr === 'true';
    const now = dayJS().toISOString();
    if (!showPast) events.where('date', '>=', now);

    // we fetch everything by default if you're a group member,
    // then filter on the client
    const dontFetchDrafts = isDraftStr === 'false';
    if (dontFetchDrafts) events.where('isDraft', false);

    events.where({orgId}).orderBy('date', 'asc');

    const parsedLimit = limitStr ? parseInt(limitStr, 10) : 3;
    const parsedOffset = offsetStr ? parseInt(offsetStr, 10) : 0;
    if (parsedLimit > 0) events.limit(parsedLimit);
    if (parsedOffset > 0) events.offset(parsedOffset);

    return events;
  } catch (err) {
    return ctx.throw(500, err);
  }
};
