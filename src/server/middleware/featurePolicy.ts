import Koa from 'koa';
import koaHelmet from 'koa-helmet';

// diable browser features we don't use to prevent their abuse
export const featurePolicyMiddleware = async (app: Koa) =>
  app.use(koaHelmet.featurePolicy({
    features: {
      camera: ["'none'"],
      fullscreen: ["'none'"],
      microphone: ["'none'"],
      // vibrate: ["'none'"],
      syncXhr: ["'none'"],
    },
  }));

