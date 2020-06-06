import Koa from 'koa';
import Router from 'koa-router';
import {Mutable} from 'utility-types';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {schema} from './_schema';

export const accountDownload = new Router();
const route = '/api/v1/download';

accountDownload.get(route, async (ctx: Koa.ParameterizedContext) => {
  const session = ctx?.state?.user;
  await validateSchema<Mutable<ts.idQuery>>(ctx, schema, {id: session?.id});

  let roles: ts.roleMap[];
  let rsvps: ts.rsvp[];
  let meetings: ts.meeting[];

  const body: {[key: string]: unknown} = {account: session};
  if (typeof session.username === 'string') {
    try {
      roles = await pg('users_roles')
        .where({userId: session.id})
        .select('role');
    } catch (err) {
      return ctx.throw(500, err);
    }
    try {
      rsvps = await pg('users_meetings')
        .where({userId: session.id})
        .select(['type', 'value']);
    } catch (err) {
      return ctx.throw(500, err);
    }

    body.roles = roles;
    body.rsvps = rsvps;
  } else {
    try {
      meetings = await pg('meetings')
        .where({groupId: session.id})
        .select('*');
    } catch (err) {
      return ctx.throw(500, err);
    }

    body.meetings = meetings;
  }

  const filename = session.name || session.username;

  ctx.res.setHeader('Content-Type', 'application/json');
  ctx.res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.json"`,
  );

  ctx.body = body;
});
