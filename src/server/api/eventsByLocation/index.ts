import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const eventsByLocation = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/eventsByLocation';

eventsByLocation.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  // mapped set of events that the user has RSVP'd to
  // @TODO this should be querying against postcodes, not cities
  // but there is an issue with the postcode seed where the cityId does not match
  // this is problematic since there can be dupe city names in a state
  let cityRel = {} as tPostCode;
  try {
    cityRel = await knex('cities')
      .first()
      .where({name: query.city, region: query.region})
      .limit(1);
  } catch (err) {
    return ctx.throw(500, err);
  }

  // now only return future events where the user rsvped
  let events = [] as tEvent[];
  try {
    events = await knex('events')
      .where({cityId: cityRel.id})
      .where('date', '>=', dayJS().toISOString())
      .where({isDraft: false})
      .orderBy('date', 'asc')
      .limit(100);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = events;
});
