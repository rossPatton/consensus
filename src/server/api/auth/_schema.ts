import Joi from '@hapi/joi';

export const schema = Joi.object({
  id: Joi.number().integer().required(),
  isVerified: Joi.bool(),
  login: Joi.string().alphanum().required(),
  password: Joi.string().min(12).required(),
  passwordResetExpires: Joi.string().allow(null),
  passwordResetToken: Joi.string().allow(null),
  orgId: Joi.number().integer().allow(null),
  userId: Joi.number().integer().allow(null),

  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
