import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const tokenSchema = Joi.object({
  isFormSubmit: Joi.bool(),
  login: Joi.string().required().min(3),
  password: Joi.string().min(12).max(4096).required(),
  token: Joi.string().hex().required(),
});
