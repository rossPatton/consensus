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

  const body: {[key: string]: unknown} = {account: session};
  let filename = session.name;
  if (typeof session.username === 'string') {

    filename = session.username;

    try {
      await pg.transaction(async trx => {
        const roles = await pg('users_roles')
          .transacting(trx)
          .where({userId: session.id})
          .select('role');

        const rsvps = await pg('users_meetings')
          .transacting(trx)
          .where({userId: session.id})
          .select(['type', 'value']);

        body.roles = roles;
        body.rsvps = rsvps;
        return null;
      });
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else {
    try {
      const meetings = await pg('meetings')
        .where({groupId: session.id})
        .select('*');

      body.meetings = meetings;
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  ctx.res.setHeader('Content-Type', 'application/json');
  ctx.res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filename}.json"`,
  );

  ctx.body = body;
});
