import Joi from '@hapi/joi';

export const schema = Joi.object({
  deletionDeadline: Joi.date().timestamp().allow(null),
  id: Joi.number().integer().required(),
  isVerified: Joi.bool(),
  login: Joi.string().required(),
  password: Joi.string().min(12).required(),
  passwordResetExpires: Joi.date().timestamp().allow(null),
  passwordResetToken: Joi.date().timestamp().allow(null),
  privateEmail: Joi.bool(),
  orgId: Joi.number().integer().allow(null),
  userId: Joi.number().integer().allow(null),
  verificationExpires: Joi.date().timestamp().allow(null),
  verificationToken: Joi.date().timestamp().allow(null),

  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
