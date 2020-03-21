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
  let cityRel = {} as tGeo;
  try {
    cityRel = await knex('postcodes')
      .first()
      .where({code: query.postcode})
      .limit(1);
  } catch (err) {
    return ctx.throw(500, err);
  }

  // now only return future events where the user rsvped
  let events: tEvent[] = [];
  try {
    events = await knex('events')
      .where({cityId: cityRel.city})
      .where('date', '>=', dayJS().toISOString())
      .where({isDraft: false, isPrivate: false})
      .orderBy('date', 'asc')
      .limit(100);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = events;
});
