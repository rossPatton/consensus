// import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

// import stateCodeToNameMap from '~app/json/usa/stateCodeToNameMap.json';
// import { lowerCase, slugify } from '~app/utils';

// import { lookup } from '..';

export const geo = new Router();
geo.get('/api/v1/geo', async (
  // ctx: Koa.ParameterizedContext,
) => {
  return null;
  // let ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;

  // // if on dev, or failed prod lookup, default to a New York ip
  // if (__DEV__ || ip === '::1') {
  //   ip = '67.245.144.167'; // default to NYC in dev mode
  //   //  more ips to test
  //   //  '65.49.22.66' indianapolis
  //   //  '103.212.227.126' => sydney australia
  // }

  // const cityLookup = lookup.get(ip as string);
  // const country = cityLookup?.registered_country?.iso_code || '';
  // // if (__PROD__ && country !== 'US') {
  // //   ctx.redirect('/gdpr');
  // //   return ctx.throw(401);
  // // }

  // const city: string = cityLookup?.city?.names.en || '';
  // const postcode: string = cityLookup?.postal?.code || '';
  // const regionCode: string = lowerCase(
  //   cityLookup?.subdivisions?.[0]?.iso_code || '',
  // );
  // const region = (stateCodeToNameMap as {[k: string]: unknown})[regionCode] || '';

  // ctx.body = {
  //   city,
  //   countryCode: country,
  //   handle: slugify(city),
  //   region,
  //   regionCode,
  //   postcode: parseInt(postcode, 10),
  // };
});
