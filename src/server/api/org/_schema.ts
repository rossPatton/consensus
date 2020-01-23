import Joi from '@hapi/joi';

export const schema = Joi.object({
  testValue: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});
