import Joi from '@hapi/joi';

export const schema = Joi.object({
  cityId: Joi.number().integer(),
  name: Joi.string(),
  regionCode: Joi.string().max(2),
  regionId: Joi.number().integer(),
});
