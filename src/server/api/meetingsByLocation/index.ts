import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const meetingsByLocation = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/meetingsByLocation';

meetingsByLocation.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  // mapped set of meetings that the user has RSVP'd to
  // @TODO this should be querying against postcodes, not cities
  // but there is an issue with the postcode seed where the cityId does not match
  // this is problematic since there could be dupe city names in a state
  let cityRel = {} as tPostCode;
  try {
    cityRel = await knex('cities')
      .first()
      .where({name: query.city, regionCode: query.regionCode})
      .limit(1);
  } catch (err) {
    return ctx.throw(500, err);
  }

  // now only return future meetings where the user rsvped
  let meetings = [] as tMeeting[];
  try {
    meetings = await knex('meetings')
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
