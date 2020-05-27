import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getRSVPsByUserId} from '../../queries';
import {validateSchema, zipMeetingsWithAttendees} from '../../utils';
import {schema} from './_schema';
import {tMeetingsByUserServerQuery} from './_types';

export const meetingsByUserId = new Router();

const route = '/api/v1/meetingsByUserId';

meetingsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tMeetingsByUserServerQuery = ctx?.state?.locals?.data;
  await validateSchema(ctx, schema, query);

  const userRSVPs = await getRSVPsByUserId(ctx, query.userId);

  // mapped set of meetings that the user has RSVP'd to
  let mappedIds: number[] = [];
  try {
    mappedIds = await Promise.all(_.uniq(
      userRSVPs.map(async idSet => idSet.meetingId),
    ));
  } catch (err) {
    return ctx.throw(500, err);
  }

  // only return future meetings where the user rsvped
  let meetings: ts.meeting[] = [];
  try {
    meetings = await knex('meetings')
      .whereIn('id', mappedIds)
      .andWhere('date', '>=', dayJS().toISOString())
      .andWhere({isDraft: false})
      .orderBy('date', 'asc');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = await zipMeetingsWithAttendees(ctx, meetings, userRSVPs);
});
