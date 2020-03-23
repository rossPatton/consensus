import Joi from '@hapi/joi';

export const baseSchema = Joi.object({
  isFormSubmit: Joi.bool(),
});

export const emailSchema = baseSchema.keys({
  email: Joi.string().email().required(),
});

export const tokenSchema = baseSchema.keys({
  login: Joi.string().required(),
  password: Joi.string().min(12).max(4096).required(),
  token: Joi.string().hex().required(),
});
