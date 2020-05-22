import Koa from 'koa';
import Router from 'koa-router';
import {Mutable} from 'utility-types';

import {knex} from '../../db/connection';
import {getProfileByAccountId} from '../../queries';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const accountDownload = new Router();
const route = '/api/v1/download';

accountDownload.get(route, async (ctx: Koa.ParameterizedContext) => {
  const account: ts.account = ctx?.state?.user || {};
  const profile = await getProfileByAccountId(ctx, account);
  await validateSchema<Mutable<ts.idQuery>>(ctx, schema, {id: account.id});

  let roles: ts.roleMap[];
  let rsvps: ts.rsvp[];
  let meetings: ts.meeting[];
  const type = account.groupId ? 'group' : 'user';

  if (type === 'user') {
    try {
      roles = await knex('accounts_roles')
        .where({accountId: account.id})
        .select('role');
    } catch (err) {
      return ctx.throw(500, err);
    }
    try {
      rsvps = await knex('users_meetings')
        .where({userId: account.userId})
        .select(['type', 'value']);
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else {
    try {
      meetings = await knex('meetings')
        .where({groupId: account.groupId})
        .select('*');
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  const {created_at, id, updated_at, ...profileToSend} = profile;
  const body: {[key: string]: unknown} = {
    account: {
      created_at: account.created_at,
      email: account.email,
      login: account.login,
      profile: profileToSend,
      updated_at: account.updated_at,
    },
  };
  if (type === 'user') {
    body.roles = roles;
    body.rsvps = rsvps;
  } else if (type === 'group') {
    body.meetings = meetings;
  }
  const filename = type === 'group'
    ? profileToSend.name
    // @ts-ignore
    : profileToSend.username;

  ctx.res.setHeader('Content-Type', 'application/json');
  ctx.res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.json"`,
  );
  ctx.body = body;
});
