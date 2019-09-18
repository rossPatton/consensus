import Koa from 'koa';
import koaHelmet, { KoaHelmetContentSecurityPolicyConfiguration } from 'koa-helmet';

// only allow assets served from our origin or a trusted cdn
// required nonces for any inline scripts and SRI for cdns to verify integrity
export const contentSecurityPolicyMiddleware = async (app: Koa) => {
  app.use(async (ctx, next) => {
    const directives = __DEV__ ?
      ["'self'", '0.0.0.0:*', '127.0.0.1:*', 'localhost:*'] :
      ["'self'"];

    const cspOpts: KoaHelmetContentSecurityPolicyConfiguration = {
      directives: {
        defaultSrc: directives,
        frameAncestors: ["'none'"],
        imgSrc: ["'self'", 'picsum.photos', 'via.placeholder.com'],
        objectSrc: ["'none'"],
        sandbox: [
          'allow-forms',
          'allow-same-origin',
          'allow-scripts',
        ],
        // TODO cant use inline css in svgs either, at least in ff
        // unsafe inline just here for now until i can redo the svgs
        styleSrc: [...directives, "'unsafe-inline'"],
        scriptSrc: [
          ...directives,
          "'unsafe-inline'",
          'ajax.googleapis.com',
          `'nonce-${ctx.state.locals.nonce}'`,
        ],
        upgradeInsecureRequests: true,
      },
      reportOnly: true,
    };

    if (__DEBUG__ || __PROD__) {
      cspOpts.reportOnly = true;
      cspOpts.directives = {
        ...cspOpts.directives,
        reportUri: '/report-violation',
      };
    }

    return koaHelmet.contentSecurityPolicy(cspOpts)(ctx, next);
  });
};
