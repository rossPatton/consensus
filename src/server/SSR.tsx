import { ChunkExtractor } from '@loadable/server';
import Koa from 'koa';
import _ from 'lodash';
import path from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import {spacesUrl} from '~app/constants';
import { AppShell } from '~app/containers';
import styles from '~app/css/styles.css';

import { initStoreForSSR } from './initStoreForSSR';

// this is the stats file generated by webpack loadable plugin
const statsFile = path.resolve('./dist/loadable-stats.json');

export const SSR = async (app: Koa, ctx: Koa.ParameterizedContext) => {
  const nonce = app?.context?.state?.nonce || '';
  // need to be set for server streaming, if not set, then koa will crap out
  ctx.respond = false;
  ctx.type = 'text/html';

  // set stricter whitelist for prod
  const local = __DEV__
    ? "'self' 127.0.0.1:* 0.0.0.0:* https://consensus.local"
    : "'self'";
  const hcaptcha = 'https://*.hcaptcha.com https://hcaptcha.com';
  const imgSrc = `${local} ${spacesUrl} https://i.picsum.photos https://picsum.photos data:`;

  // webpack debug mode seems to use eval(?) so disable the CSP in debug mode
  // i think this is mostly fine, considering the CSP runs for every other case
  const CSP = !__DEBUG__ ? `<meta charset="UTF-8" /><meta http-equiv="Content-Security-Policy" content="base-uri 'none'; connect-src ${local}; default-src 'self'; block-all-mixed-content; font-src ${local}; form-action ${local}; frame-src ${hcaptcha}; img-src ${imgSrc}; manifest-src ${local}; object-src 'none'; script-src ${local} ${hcaptcha} 'nonce-${nonce}'; style-src ${hcaptcha} ${local} 'nonce-${nonce}'">` : '';

  ctx.res.write(`<!DOCTYPE html><html lang="en"><head>${CSP}<title>Consensus - when you need to get organized.</title><style nonce="${nonce}">${styles}</style></head><body><div id="appRoot">`);

  const initRouterContext = {};
  const store = await initStoreForSSR(ctx);

  const extractor = new ChunkExtractor({ statsFile });
  const jsx = extractor.collectChunks(
    <Provider store={store as any}>
      <StaticRouter
        context={initRouterContext}
        location={ctx.request.url}>
        <AppShell />
      </StaticRouter>
    </Provider>,
  );

  const htmlStream = renderToNodeStream(jsx);
  htmlStream.pipe(ctx.res, {end: false});
  htmlStream.on('end', () => {
    ctx.res.write(`</div>
      <script nonce="${nonce}">
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c',
  )}
    </script>
      <script defer src="/vendor.bundle.js"></script>
      <script defer src="/main.js"></script>
      </body></html>`);
    ctx.res.end();
  });
};
