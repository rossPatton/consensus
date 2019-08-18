import Koa from 'koa';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToNodeStream } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { AppShell } from '../containers';
import styles from '../css/styles.styl';
import { initStoreForSSR } from './initStore';


export const SSR = async (ctx: Koa.ParameterizedContext) => {
  // need to be set for server streaming, if not set, then koa will crap out
  ctx.respond = false;
  ctx.type = 'text/html';
  ctx.res.write(`
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Consensus - when you need to get organized.</title><style>${styles}</style></head><body><div id="appRoot">`);

  const initRouterContext = {};
  const store = await initStoreForSSR(ctx);
  console.log('store => ', store);
  const htmlStream = renderToNodeStream(
    <Provider store={store as any}>
      <StaticRouter context={initRouterContext} location={ctx.request.url}>
        <AppShell />
      </StaticRouter>
    </Provider>
  );
  htmlStream.pipe(ctx.res, { end: false });
  htmlStream.on('end', () => {
    ctx.res.write(`</div><div id="portalRoot"></div>
      <script nonce="${ctx.state.locals.nonce}">WebFontConfig={custom:{families:["Ivar","Lab","LabBlack","Eksell"],urls:["/static/fonts.css"]}};window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>
      <script defer src="/vendor.main.js"></script>
      <script defer src="/main.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
      </body></html>`);
    ctx.res.end();
  });
};
