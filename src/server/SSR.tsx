import Koa from 'koa';
import _ from 'lodash';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { spacesUrl } from '~app/constants';
import { AppShell } from '~app/containers';
import styles from '~app/css/styles.css';

import webpackManifest from '../../dist/webpack-manifest.json';
import { initStoreForSSR } from './initStoreForSSR';

// set stricter whitelist for prod
const local = __DEV__
  ? "'self' 127.0.0.1:* 0.0.0.0:* https://consensus.local"
  : "'self'";

const hcaptcha = 'https://*.hcaptcha.com https://hcaptcha.com';
const imgSrc = `${local} ${spacesUrl}`;

export const SSR = async (app: Koa, ctx: Koa.ParameterizedContext) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const nonce = app?.context?.state?.nonce || '';

  // need to be set for server streaming, if not set, then koa will crap out
  ctx.respond = false;
  ctx.type = 'text/html';

  const useCssLink = cookies.get('cssPreloaded') === 'true';
  let css = `<style nonce="${nonce}">${styles}</style>`;
  if (useCssLink) {
    css = '<link rel="stylesheet" href="/style.css" />';
  }

  // webpack debug mode seems to use eval(?) so disable the CSP in debug mode
  // i think this is mostly fine, considering the CSP runs for every other case
  const CSP = `<meta http-equiv="Content-Security-Policy" content="base-uri 'none'; connect-src ${local}; default-src 'self'; block-all-mixed-content; font-src ${local}; form-action ${local}; frame-src ${hcaptcha}; img-src ${imgSrc}; manifest-src ${local}; object-src 'none'; script-src ${local} ${hcaptcha} 'nonce-${nonce}'; style-src ${hcaptcha} ${local} 'nonce-${nonce}'; worker-src ${local}">`;

  // helmet was stripping these out, and they should be conditional anyway
  // the css and font file will probably never change, or almost never, so lets
  // only preload them if the user hasn't cached it already
  const prefetchCSS = useCssLink
    ? ''
    : '<link rel="prefetch" href="/style.css" as="style">';

  const preloadFonts = cookies.get('fontsPreloaded') === 'true'
    ? ''
    : '<link crossOrigin="anonymous" rel="preload" href="/fonts/founders-grotesk-text-web-medium-subset.woff2" as="font" type="font/woff2">';

  const vendor = webpackManifest['vendor.js'];
  const main = webpackManifest['main.js'];
  const prefetchVendor = `<link rel="preload" href=${vendor} as="script">`;
  const prefetchMain = `<link rel="preload" href=${main} as="script">`;

  ctx.res.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />${CSP}<title>Consensus - when you need to get organized.</title>${css}${preloadFonts}${prefetchVendor}${prefetchMain}${prefetchCSS}</head><body><div id="appRoot">`);

  const {store} = await initStoreForSSR(ctx);
  const jsx = (
    <Provider store={store as any}>
      <StaticRouter
        context={{}}
        location={ctx.request.url}>
        <AppShell />
      </StaticRouter>
    </Provider>
  );

  const stringifiedState = JSON.stringify(store.getState())
    .replace(/</g, '\\u003c');

  const htmlStream = renderToNodeStream(jsx);
  htmlStream.pipe(ctx.res, {end: false});
  htmlStream.on('end', () => {
    ctx.res.write(`</div><div id="portal"></div><noscript>Consens.us requires Javascript to be enabled.</noscript><script nonce="${nonce}">window.__PRELOADED_STATE__ = ${stringifiedState}</script><script defer src="${vendor}"></script><script src="${main}"></script></body></html>`);

    ctx.res.end();
  });
};
