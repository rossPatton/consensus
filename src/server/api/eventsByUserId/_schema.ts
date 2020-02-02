import Joi from '@hapi/joi';

export const schema = Joi.object({
  userId: Joi.number().integer().required(),
});
