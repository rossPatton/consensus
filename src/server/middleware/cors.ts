import cors from '@koa/cors';
import Koa from 'koa';

// avoid CORS horrors in dev mode, enable for prod
export const corsMiddleware = async (app: Koa) => {
  if (__PROD__) return app.use(cors());
  await app.use(cors({
    credentials: true,
    origin: '*',
  }));
};
