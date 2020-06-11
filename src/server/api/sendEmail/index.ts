import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {sendEmail as mgEmailer, validateSchema} from '~app/server/utils';

import {emailSchema} from './_schema';
import {tQuery} from './_types';

export const sendEmail = new Router();

// general email sender using contact form
sendEmail.get('/api/v1/sendEmail', async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tQuery} = ctx;
  await validateSchema<tQuery>(ctx, emailSchema, query);

  const resp = await mgEmailer(ctx, {
    from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
    to: 'hello@consens.us.org',
    subject: query.subject,
    text: `The following feedback was provided by: ${query.email}. ${query.content}`,
    html: `
      <h2>The following feedback was provided by: <b>${query.email}</b></h2>
      <br /><br />${query.content}
    `,
  });

  ctx.body = resp;
});
