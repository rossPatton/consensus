import Joi from '@hapi/joi';
import Koa from 'koa';

export const validateSchema = async <T>(
  ctx: Koa.ParameterizedContext,
  schema: Joi.ObjectSchema<any>,
  query: T,
) => {
  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = err?.details?.[0]?.message || 'Bad Request';
    return ctx.throw(400, message);
  }
};
