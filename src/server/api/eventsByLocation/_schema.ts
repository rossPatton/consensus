import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string(),
  countryCode: Joi.string().alphanum().max(2).optional(),
  handle: Joi.string(),
  postcode: Joi.number().integer(),
  region: Joi.string(),
  regionCode: Joi.string().max(2),
  state: Joi.string(),
});
