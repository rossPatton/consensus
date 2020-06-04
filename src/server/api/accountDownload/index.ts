import Koa from 'koa';
import Router from 'koa-router';
import {Mutable} from 'utility-types';

import {pg} from '~app/server/db/connection';
import {getSession} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {schema} from './_schema';

export const accountDownload = new Router();
const route = '/api/v1/download';

accountDownload.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {data: account} = await getSession(ctx);
  await validateSchema<Mutable<ts.idQuery>>(ctx, schema, {id: account.id});

  let roles: ts.roleMap[];
  let rsvps: ts.rsvp[];
  let meetings: ts.meeting[];

  if (account?.data?.type === 'user') {
    try {
      roles = await pg('users_roles')
        .where({userId: account.id})
        .select('role');
    } catch (err) {
      return ctx.throw(500, err);
    }
    try {
      rsvps = await pg('users_meetings')
        .where({userId: account.id})
        .select(['type', 'value']);
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else if (account?.data?.type === 'group') {
    try {
      meetings = await pg('meetings')
        .where({groupId: account.id})
        .select('*');
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  const body: {[key: string]: unknown} = {
    account,
  };
  if (account.type === 'user') {
    body.roles = roles;
    body.rsvps = rsvps;
  } else if (account.type === 'group') {
    body.meetings = meetings;
  }

  const filename = account.type === 'group'
    ? account.name
    : account.username;

  ctx.res.setHeader('Content-Type', 'application/json');
  ctx.res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.json"`,
  );
  ctx.body = body;
});
