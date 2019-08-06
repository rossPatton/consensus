import Koa from 'koa';
import koaHelmet, { KoaHelmetContentSecurityPolicyConfiguration } from 'koa-helmet';

// helmet, the security middleware, not the react metadata thing
export const helmetMiddleware = async (app: Koa) => {
  await app.use(koaHelmet());

  // limit referrer data to same-origin only
  await app.use(koaHelmet.referrerPolicy({ policy: 'same-origin' }));

  // diable browser features we don't use to prevent their abuse
  // app.use(koaHelmet.featurePolicy({
  //   features: {
  //     camera: ["'none"],
  //     fullscreen: ["'none'"],
  //     microphone: ["'none'"],
  //     vibrate: ["'none'"],
  //     syncXhr: ["'none'"],
  //   },
  // }));

  const directives = __DEV__ ?
    ["'self'", '0.0.0.0:*', '127.0.0.1:*', 'localhost:*'] :
    ["'self'"];

  const cspOpts: KoaHelmetContentSecurityPolicyConfiguration = {
    directives: {
      defaultSrc: ["'self'"], // directives,
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      sandbox: [
        'allow-forms',
        'allow-same-origin',
        'allow-scripts',
      ],
      styleSrc: directives,
      scriptSrc: [
        'ajax.googleapis.com',
        // switch to nonce
        `sha256-${__HASH__}`,
      ],
      upgradeInsecureRequests: true,
    },
    reportOnly: false,
  };

  if (__DEBUG__ || __PROD__) {
    cspOpts.reportOnly = true;
    cspOpts.directives = {
      ...cspOpts.directives,
      reportUri: '/report-violation',
    };
  }

  // only allow assets served from our origin or a trusted cdn
  // required nonces for any inline scripts and SRI for cdns to verify integrity
  return app.use(koaHelmet.contentSecurityPolicy(cspOpts));
};
