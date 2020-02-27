import Joi from '@hapi/joi';

export const schema = Joi.object({
  key: Joi.string().allow('name', 'category', 'city', 'region').required(),
  value: Joi.string().regex(/^[-\w\s]+$/).required(),
});
