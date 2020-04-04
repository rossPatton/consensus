import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string().required().regex(/^\w|-+$/),
  countryCode: Joi.string().lowercase().alphanum().max(2).required(),
  regionCode: Joi.string().lowercase().alphanum().max(2).required(),
});
