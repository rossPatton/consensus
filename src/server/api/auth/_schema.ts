import Joi from '@hapi/joi';

export const schema = Joi.object({
  avatar: Joi.string().allow(null).empty('').optional(),
  deletionDeadline: Joi.date().timestamp().allow(null),
  email: Joi.string().email().required(),
  id: Joi.number().integer().required(),
  isVerified: Joi.bool(),
  isNew: Joi.bool(),
  login: Joi.string().required(),
  password: Joi.string().min(12).max(4096).required(),
  passwordResetExpires: Joi.date().timestamp().allow(null),
  passwordResetToken: Joi.string().alphanum().length(96).allow(null),
  privateEmail: Joi.bool(),
  groupId: Joi.number().integer().allow(null),
  userId: Joi.number().integer().allow(null),
  verificationExpires: Joi.date().timestamp().allow(null),
  verificationToken: Joi.string().alphanum().length(96).allow(null),
  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
