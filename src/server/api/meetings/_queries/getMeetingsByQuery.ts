import dayJS from 'dayjs';
import Koa from 'koa';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';

import {tMeetingsServerQuery} from '../_types';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getMeetingsByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: tMeetingsServerQuery,
): Promise<ts.meeting[]> => {
  const {
    exclude: excludeId,
    isDraft: isDraftStr,
    limit: limitStr,
    offset: offsetStr,
    groupId,
    showPast: showPastStr,
  } = query;

  try {
    // by default, we only return upcoming meetings
    const meetings = pg('meetings');

    // if we're excluding meetings, do it up front
    if (excludeId) meetings.whereNot({id: excludeId});

    // if no showPast boolean, then return *only* upcoming meetings
    const showPast = showPastStr === 'true';
    const now = dayJS().toISOString();
    if (!showPast) meetings.where('date', '>=', now);

    // we fetch everything by default if you're a group member,
    // then filter on the client
    const dontFetchDrafts = isDraftStr === 'false';
    if (dontFetchDrafts) meetings.where('isDraft', false);

    meetings.where({groupId}).orderBy('date', 'asc');

    const parsedLimit = limitStr ? parseInt(limitStr, 10) : 3;
    const parsedOffset = offsetStr ? parseInt(offsetStr, 10) : 0;
    if (parsedLimit > 0) meetings.limit(parsedLimit);
    if (parsedOffset > 0) meetings.offset(parsedOffset);

    return meetings;
  } catch (err) {
    return ctx.throw(500, err);
  }
};
