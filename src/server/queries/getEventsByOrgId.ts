import dayJS from 'dayjs';
import _ from 'lodash';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getEventsByOrgId = async (data: any) => {
  const {
    exclude,
    id: orgId,
    isDraft: isDraftStr,
    isPublic: isPublicStr,
    limit,
    offset,
    showPast: showPastStr,
  } = data;

  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  // by default, we only return upcoming events
  const events = knex('events');

  // if we're excluding events, do it up front
  if (exclude) events.whereNot({id: exclude});

  // if user isn't logged in or a member, only show public events
  const isPublic = isPublicStr === 'true';
  if (isPublic) events.where({isPrivate: false});

  const showPast = showPastStr === 'true';
  const now = dayJS().toISOString();
  // return old events
  if (showPast) events.where('date', '<', now);
  // return upcoming events
  if (!showPast) events.where('date', '>=', now);

  const isDraft = isDraftStr === 'true';
  events.where({isDraft, orgId}).orderBy('date', 'asc');

  if (parsedLimit > 0) events.limit(parsedLimit);
  if (parsedOffset > 0) events.offset(parsedOffset);

  return events;
};
