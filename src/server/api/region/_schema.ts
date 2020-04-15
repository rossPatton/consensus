import Joi from '@hapi/joi';

export const schema = Joi.object({
  countryCode: Joi.string().alphanum().max(2).optional(),
  regionCode: Joi.string().lowercase().alphanum().max(2).required(),
});
