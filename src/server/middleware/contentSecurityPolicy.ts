import Koa from 'koa';
import koaHelmet, { KoaHelmetContentSecurityPolicyConfiguration } from 'koa-helmet';

// only allow assets served from our origin or a trusted cdn
// required nonces for any inline scripts and SRI for cdns to verify integrity
export const contentSecurityPolicyMiddleware = async (app: Koa) => {
  app.use(async (ctx, next) => {
    const cspOpts: KoaHelmetContentSecurityPolicyConfiguration = {
      // most directive we define via the meta tag
      // for some reason, doing it all via the middleware here causes some issues with FF
      // splitting it up - by doing most of it via meta tag in server/SSR.tsx and
      // the rest of it here, seems to be the solution that works cross-browser
      // also - on FF, if you use react/redux dev tools, it will trigger a CSP error
      directives: {
        frameAncestors: ["'none'"],
        reportUri: '/report-violation',
        sandbox: [
          'allow-forms',
          'allow-same-origin',
          'allow-scripts',
        ],
      },
      // if something breaks, set this to true to make it easier to investigate
      reportOnly: false,
    };

    return koaHelmet.contentSecurityPolicy(cspOpts)(ctx, next);
  });
};
