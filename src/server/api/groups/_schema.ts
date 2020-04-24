import Joi from '@hapi/joi';

export const schema = Joi.object({
  category: Joi.string(),
  city: Joi.string().alphanum(),
  cityId: Joi.number().integer(),
  country: Joi.string().alphanum(),
  countryId: Joi.number().integer(),
  id: Joi.number().integer(),
  name: Joi.string().alphanum(),
  region: Joi.string().alphanum(),
  regionId: Joi.number().integer(),
});
