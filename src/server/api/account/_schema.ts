import Joi from '@hapi/joi';

const baseSchema = Joi.object({isFormSubmit: Joi.bool()});

export const patchSchema = baseSchema.keys({
  deletionDeadline: Joi.date().allow(null).optional(),
  email: Joi.string().email().optional(),
  login: Joi.string().optional(),
  // current password required to make any account changes
  password: Joi.string().min(12).required(),
  privateEmail: Joi.bool(),
  newPassword: Joi.string().min(12).optional(),
});

export const deleteSchema = baseSchema.keys({
  id: Joi.number().integer().required(),
  login: Joi.string().required(),
  password: Joi.string().min(12).required(),
  userId: Joi.number().integer().required(),
});
