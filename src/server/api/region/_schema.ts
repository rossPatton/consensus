import Joi from '@hapi/joi';

export const schema = Joi.object({
  country: Joi.string().alphanum().max(2).required(),
  // @TODO region === regionCode
  region: Joi.string().alphanum().max(2).required(),
});
