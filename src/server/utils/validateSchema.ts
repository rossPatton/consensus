import Joi from '@hapi/joi';
import Koa from 'koa';
import _ from 'lodash';

export const validateSchema = async <T>(
  ctx: Koa.ParameterizedContext,
  schema: Joi.ObjectSchema<any>,
  query: T,
) => {
  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details?.[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }
};
