import Joi from '@hapi/joi';

export const schema = Joi.object({
  password: Joi.string().min(12).required(),
  newPassword: Joi.ref('password'),
});
