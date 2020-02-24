import geolite2 from 'geolite2';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import maxmind, { CityResponse } from 'maxmind';

import {lowerCase, slugify} from '../../../utils';

export const geo = new Router();
geo.get('/api/v1/geo', async (ctx: Koa.ParameterizedContext) => {
  let ip = ctx.req.headers['x-forwarded-for']
    || ctx.req.connection.remoteAddress;

  // if on dev, or failed prod lookup, default to a New York ip
  if (__DEV__ || ip === '::1') {
    ip = '67.245.145.102';
    // '65.49.22.66' indianapolis
    // '103.212.227.126' => sydney australia
  }

  let lookup = null;
  try {
    lookup = await maxmind.open<CityResponse>(geolite2.paths.city);
  } catch (err) {
    ctx.throw(400, err);
  }

  const cityLookup = lookup.get(ip as string);
  const city: string = _.get(cityLookup, 'city.names.en', '');
  const postcode: string = _.get(cityLookup, 'postal.code', '');
  const state: string = _.get(cityLookup, 'subdivisions[0].iso_code', '');

  if (!city && !postcode) {
    ctx.status = 204;
    ctx.body = {city: null, postcode: null};
  }

  ctx.body = {
    city,
    handle: slugify(city),
    state: lowerCase(state),
    postcode: parseInt(postcode, 10),
  };
});