import Koa from 'koa';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToNodeStream } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { AppShell } from '../containers';
import { initStoreForSSR } from './initStore';

// import stylus from '../css/styles.styl';

export const SSR = async (ctx: Koa.ParameterizedContext) => {
  // need to be set for server streaming, if not set, then koa will crap out
  ctx.respond = false;
  ctx.type = 'text/html';
  ctx.res.write(`
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Consensus - when you need to get organized.</title><link rel="stylesheet" href="/static/styles.css" /></head><body><div id="appRoot">`);

  const store = await initStoreForSSR(ctx);

  const initRouterContext = {};
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
      <script>WebFontConfig={custom:{families:["Ivar","Lab","LabBlack","Eksell"],urls:["/static/fonts.css"]}};window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>
      <script type="text/javascript" defer src="/vendor.main.js"></script>
      <script type="text/javascript" defer src="/main.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
      </body></html>`);
    ctx.res.end();
  });
};
