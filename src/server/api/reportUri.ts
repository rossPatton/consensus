import Koa from 'koa';
import Router from 'koa-router';
import loglevel from 'loglevel';

export const reportUri = new Router();

// @ts-ignore
reportUri.post('reportUri', '/report-violation', async (ctx: Koa.Context) => {
  if (ctx.request.body) {
    loglevel.error('CSP Violation: ', ctx.request.body);
  } else {
    loglevel.info('CSP Violation: No data received!');
  }

  ctx.status = 204;
  ctx.body = `CSP Violation: ${ctx.request.body}`;
  ctx.app.emit('error', 'CSP Violation', ctx.request.body);
});
