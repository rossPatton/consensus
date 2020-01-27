import Joi from '@hapi/joi';

export const schema = Joi.object({
  userId: Joi.string().regex(/^\d+$/).required(),
});
