import Koa from 'koa';
import koaHelmet, { KoaHelmetContentSecurityPolicyConfiguration } from 'koa-helmet';
import uuidv4 from 'uuid/v4';

let prevUrl: string | undefined;

// only allow assets served from our origin or a trusted cdn
// required nonces for any inline scripts and SRI for cdns to verify integrity
export const contentSecurityPolicyMiddleware = async (app: Koa) => {
  app.use(async (ctx, next) => {
    // const {nonce} = app.context.state;
    // if (!ctx.state.locals) ctx.state.locals = {};

    // let {nonce} = ctx.state.locals;
    // // only update nonce on server render - not on every single request
    // if (ctx.req.url !== prevUrl) {
    //   console.log('should only be called once');
    //   nonce = uuidv4();
    //   ctx.state.locals.nonce = nonce;
    //   prevUrl = ctx.req.url;
    // }

    const directives = ["'self'", `'nonce-${app.context.state.nonce}'`];
    // if (__DEV__) {
    //   directives = [...directives, '0.0.0.0:*', '127.0.0.1:*', 'localhost:*'];
    // }

    console.log('csp app.context => ', app.context.state.nonce);
    console.log('directives => ', directives);
    // console.log('locals.nonce => ', ctx.state.locals.nonce);

    const cspOpts: KoaHelmetContentSecurityPolicyConfiguration = {
      directives: {
        baseUri: ["'none'"],
        blockAllMixedContent: true,
        defaultSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        // TODO cant use inline css in svgs either, at least in ff
        styleSrc: directives,
        scriptSrc: [
          ...directives,
          'ajax.googleapis.com',
        ],
      },
      reportOnly: __DEV__,
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
