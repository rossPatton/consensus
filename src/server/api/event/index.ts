import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {validateSchema} from '../../utils';
import {getEventById} from './_queries';
import {getSchema} from './_schema';

export const event = new Router();
const route = '/api/v1/event';

event.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, 'state.locals.data', {});
  await validateSchema<tIdQuery>(ctx, getSchema, query);
  ctx.body = await getEventById(ctx, query);
});
