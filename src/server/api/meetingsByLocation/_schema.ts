import Joi from '@hapi/joi';

export const schema = Joi.object({
  city: Joi.string(),
  regionCode: Joi.string().max(2),
});
