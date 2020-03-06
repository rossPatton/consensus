import Joi from '@hapi/joi';

const baseSchema = Joi.object({isFormSubmit: Joi.bool()});

export const schema = baseSchema.keys({
  deletionDeadline: Joi.string(), // Joi.date().allow(null),
  password: Joi.string().min(12).required(),
  newPassword: Joi.ref('password'),
});

export const deleteSchema = baseSchema.keys({
  id: Joi.number().integer().required(),
  login: Joi.string().required(),
  password: Joi.string().min(12).required(),
  userId: Joi.number().integer().required(),
});
