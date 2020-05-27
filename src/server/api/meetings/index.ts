import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getAccountRoleRelByGroupId, getGroupById, getRSVPsByUserId} from '../../queries';
import {validateSchema, zipMeetingsWithAttendees} from '../../utils';
import {getMeetingsByQuery} from './_queries';
import {deleteSchema, getSchema} from './_schema';
import {tMeetingsServerQuery} from './_types';
import {filterMeetings} from './_utils';

export const meetings = new Router();
const route = '/api/v1/meetings';
const table = 'meetings';

// get multiple meetings at a time
meetings.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tMeetingsServerQuery = ctx?.state?.locals?.data;
  await validateSchema<tMeetingsServerQuery>(ctx, getSchema, query);

  // all meetings by generic query
  const meetings = await getMeetingsByQuery(ctx, query);

  // user role for this particular org
  const {role, userId} = await getAccountRoleRelByGroupId(ctx, query.groupId);
  const group = await getGroupById(ctx, query.groupId);

  // if fetching meetings for a private org and the user is not a member
  if (!role && group.type !== 'public') {
    ctx.redirect('/401');
    return ctx.throw(401);
  }

  // all user rsvps
  const userRSVPs = await getRSVPsByUserId(ctx, userId);
  // zip rsvps up with meetings, split by public vs private rsvps
  const meetingsWithRSVPCount = await zipMeetingsWithAttendees(ctx, meetings, userRSVPs);

  // return zipped meetings, filtered based on user login status, role, etc
  const body = await filterMeetings(ctx, meetingsWithRSVPCount, role);
  ctx.body = body;
});

meetings.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.idQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.idQuery>(ctx, deleteSchema, query);

  try {
    await knex(table).limit(1).where({id: query.id}).del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  // we use the id on the client to filter out the now deleted meeting
  ctx.body = {id: parseInt(query.id as string, 10)};
});
