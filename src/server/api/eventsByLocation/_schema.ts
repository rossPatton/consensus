import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string(),
  handle: Joi.string(),
  postcode: Joi.number().integer(),
  state: Joi.string(),
});
