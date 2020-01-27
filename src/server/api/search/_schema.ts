import Joi from '@hapi/joi';

export const schema = Joi.object({
  value: Joi.string().alphanum().required(),
});
