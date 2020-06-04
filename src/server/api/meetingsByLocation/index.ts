import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const meetingsByLocation = new Router();
const route = '/api/v1/meetingsByLocation';

meetingsByLocation.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.meetingsByLocationQuery} = ctx;
  await validateSchema<ts.meetingsByLocationQuery>(ctx, schema, query);

  // @TODO this should be querying against postcodes, eventually
  let cityRel = {} as ts.city;
  try {
    cityRel = await pg('cities')
      .first()
      .where({name: query.city, regionCode: query.regionCode})
      .limit(1);
  } catch (err) {
    return ctx.throw(500, err);
  }

  let meetings = [] as ts.meeting[];
  try {
    meetings = await pg('meetings')
      .where({cityId: cityRel.id})
      .where('date', '>=', dayJS().toISOString())
      .where({isDraft: false, isPrivate: false})
      .orderBy('date', 'asc')
      .limit(100);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = meetings;
});
