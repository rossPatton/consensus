import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {deSlugify} from '../../utils';
import {knex} from '../db/connection';

export const org = new Router();
const route = '/api/v1/org';
const table = 'orgs';
const dataPath = 'state.locals.data';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  const {
    city: citySlug,
    country: countryCode,
    region: regionCode,
    slug: orgSlug,
  } = _.get(ctx, dataPath, {});

  let country: tCountry;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code: countryCode})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let region: tRegion;
  try {
    region = await knex('regions')
      .limit(1)
      .where({
        country: country.id,
        code: regionCode,
      })
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let city: tCity;
  try {
    const cityName = deSlugify(citySlug);
    city = await knex('cities')
      .limit(1)
      .where({
        country: country.id,
        region: region.id,
        name: cityName,
      })
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let org: tOrg;
  try {
    org = await knex(table)
      .limit(1)
      .where({
        countryId: country.id,
        cityId: city.id,
        regionId: region.id,
        slug: orgSlug,
      })
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userOrgRel: tUserOrgRelation;
  try {
    userOrgRel = await knex('users_orgs')
      .limit(1)
      .where({userId, orgId: org.id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, password, updatedAt, ...safeOrg} = org;

  const orgWithRole = {
    ...safeOrg,
    role: userOrgRel ? userOrgRel.role : null,
  };

  ctx.body = orgWithRole;
});

org.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...newOrg} = _.get(ctx, dataPath, {});

  let updatedOrg: tOrg[];
  try {
    updatedOrg = await knex(table)
      .limit(1)
      .where({id: newOrg.id})
      .update(newOrg)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, password, updatedAt, ...safeOrg} = updatedOrg[0];
  ctx.body = safeOrg;
});

org.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...org} = _.get(ctx, dataPath, {});

  let newOrg: tOrg[];
  try {
    newOrg = await knex(table).insert(org).returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, password, updatedAt, ...safeOrg} = newOrg[0];
  ctx.body = safeOrg;
});
