import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const tokenSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(12).max(4096).required(),
  token: Joi.string().hex().required(),
});
