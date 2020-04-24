import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getAccountRoleRelByGroupId, getGroupById, getRSVPsByUserId} from '../../queries';
import {validateSchema, zipEventsWithAttendees} from '../../utils';
import {getMeetingsByQuery} from './_queries';
import {deleteSchema, getSchema} from './_schema';
import {tMeetingsServerQuery} from './_types';
import {filterEvents} from './_utils';

export const meetings = new Router();
const route = '/api/v1/meetings';
const dataPath = 'state.locals.data';
const table = 'meetings';

// get multiple meetings at a time
meetings.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tMeetingsServerQuery = _.get(ctx, dataPath, {});
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

  // basically, if a member of the group or public group, but no meetings scheduled
  if (!meetings) {
    ctx.status = 204;
    ctx.body = [];
  }

  // all user rsvps
  const userRSVPs = await getRSVPsByUserId(ctx, userId);
  // zip rsvps up with meetings, split by public vs private rsvps
  const eventsWithRSVPCount = await zipEventsWithAttendees(meetings, userRSVPs);

  // return zipped meetings, filtered based on user login status, role, etc
  const body = await filterEvents(ctx, eventsWithRSVPCount, role);
  ctx.body = body;
});

meetings.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, dataPath, {});
  await validateSchema<tIdQuery>(ctx, deleteSchema, query);

  try {
    await knex(table).limit(1).where({id: query.id}).del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  // we use the id on the client to filter out the now deleted meeting
  ctx.body = {id: parseInt(query.id as string, 10)};
});
