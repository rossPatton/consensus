import Joi from '@hapi/joi';

export const schema = Joi.object({
  password: Joi.string().min(12).required(),
  newPassword: Joi.ref('password'),
});

export const deleteSchema = Joi.object({
  id: Joi.number().integer().required(),
  isFormSubmit: Joi.bool(),
  login: Joi.string().required(),
  password: Joi.string().min(12).required(),
});
