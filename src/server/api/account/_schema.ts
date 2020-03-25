import Joi from '@hapi/joi';

const baseSchema = Joi.object({isFormSubmit: Joi.bool()});

export const patchSchema = baseSchema.keys({
  deletionDeadline: Joi.date().allow(null).optional(),
  email: Joi.string().email().optional(),
  isNew: Joi.bool().optional(),
  login: Joi.string().optional(),
  // current password required to make any account changes
  currentPassword: Joi.string().min(12).max(4096).required(),
  privateEmail: Joi.bool(),
  newPassword: Joi.string().min(12).max(4096).optional(),
});

export const deleteSchema = baseSchema.keys({
  id: Joi.number().integer().required(),
  currentPassword: Joi.string().min(12).max(4096).required(),
  userId: Joi.number().integer().required(),
});
