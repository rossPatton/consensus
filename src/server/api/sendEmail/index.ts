import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import marked from 'marked';
import sanitize from 'sanitize-html';

import {sendEmail as mgEmailer, validateSchema} from '~app/server/utils';

import {emailSchema} from './_schema';
import {tQuery} from './_types';

export const sendEmail = new Router();

// general email sender using contact form
sendEmail.get('/api/v1/sendEmail', async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tQuery} = ctx;
  await validateSchema<tQuery>(ctx, emailSchema, query);

  const markdown = marked(query.content);
  const html = sanitize(markdown);
  const text = sanitize(html, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const messageOpts = {
    from: `${query.from || 'Consensus'} <noreply@${__MAIL_DOMAIN__}>`,
    to: query.to,
    'recipient-variables': undefined as any,
    subject: query.subject,
    text,
    html,
  };
  if (query.recipientVariables) {
    messageOpts['recipient-variables'] = query.recipientVariables;
  }

  const response = await mgEmailer(ctx, messageOpts);
  ctx.body = response;
});
