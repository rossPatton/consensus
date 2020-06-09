import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string(),
  id: Joi.number().integer(),
  regionCode: Joi.string().max(2),
});
