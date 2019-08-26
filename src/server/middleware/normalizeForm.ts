import Koa from 'koa';
import _ from 'lodash';

// if making a client side query via js, form data === ctx.query
// if submitting a form manually via html, form data === ctx.request.body
// this middleware normalizes all queries so any data being passed to any
// api is instead held in local request state (ctx.state.locals.data)
// in most cases, we still just use ctx.query but in others, we shoudl use
// the normalized data object (when submitting a form basically)
export const normalizeFormMiddleware = async (app: Koa) => {
  await app.use((ctx, next) => {
    const { query } = ctx;
    const { body } = ctx.request;
    const isFormSubmit = _.isEmpty(query) && !_.isEmpty(body);
    const data = isFormSubmit ? body : query;
    const finalData = {...data, isFormSubmit};

    if (ctx.state.locals) {
      ctx.state.locals.data = finalData;
    } else {
      ctx.state.locals = {
        data: finalData,
      };
    }

    return next();
  });
};
