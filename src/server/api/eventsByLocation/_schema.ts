import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string(),
  handle: Joi.string(),
  postcode: Joi.number().integer(),
  region: Joi.string(),
  regionCode: Joi.string().max(2),
  state: Joi.string(),
});
