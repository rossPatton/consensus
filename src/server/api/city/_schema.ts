import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string().required().regex(/^\w|-+$/),
  country: Joi.string().alphanum().max(2).required(),
  region: Joi.string().alphanum().max(2).required(),
});
