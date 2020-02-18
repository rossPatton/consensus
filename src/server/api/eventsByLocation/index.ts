import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
// import {getRSVPsByUserId} from '../../queries';
import {validateSchema} from '../../utils';
import {schema} from './_schema';
import {tEventsByUserServerQuery} from './_types';

export const eventsByLocation = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/eventsByLocation';

eventsByLocation.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  console.log('query => ', query);

  await validateSchema(ctx, schema, query);

  // mapped set of events that the user has RSVP'd to
  let cityRel = {};
  try {
    cityRel = await knex('postcodes')
      .first()
      .where({code: query.postcode})
      .limit(1);
  } catch (err) {
    return ctx.throw(400, err);
  }

  // now only return future events where the user rsvped
  let events: tEvent[] = [];
  try {
    events = await knex('events')
      .where({cityId: cityRel.city})
      .where('date', '>=', dayJS().toISOString())
      .where({isDraft: false})
      .orderBy('date', 'asc')
      .limit(100);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = events;
});
