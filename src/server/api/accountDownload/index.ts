import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import {Mutable} from 'utility-types';

import {knex} from '../../db/connection';
import {getProfileByAccountId} from '../../queries';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const accountDownload = new Router();
const route = '/api/v1/download';

accountDownload.get(route, async (ctx: Koa.ParameterizedContext) => {
  // const query: Mutable<ts.accountQuery> = _.get(ctx, 'state.locals.data', {});
  const account: ts.account = _.get(ctx, 'state.user', {});
  const profile = await getProfileByAccountId(ctx, account);
  await validateSchema<Mutable<tIdQuery>>(ctx, schema, {id: account.id});

  let emails: string[];
  try {
    emails = await knex('accounts_emails')
      .where({accountId: account.id})
      .select(['email', 'isPrimary']);
  } catch (err) {
    return ctx.throw(500, err);
  }

  let roles: ts.roleMap[];
  let rsvps: tRSVP[];
  let meetings: tMeeting[];
  const type = account.groupId ? 'org' : 'user';

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
      login: account.login,
      profile: profileToSend,
      updated_at: account.updated_at,
    },
    emails,
  };
  if (type === 'user') {
    body.roles = roles;
    body.rsvps = rsvps;
  } else if (type === 'org') {
    body.meetings = meetings;
  }
  const filename = type === 'org'
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
