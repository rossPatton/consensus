import Joi from '@hapi/joi';

export const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const baseAccountSchema = Joi.object({
  avatar: Joi.string().allow(null).allow('').optional(),
  city: Joi.string().allow(null).optional(),
  cityId: Joi.number().integer().allow(null).optional(),
  country: Joi.string().allow(null).optional(),
  countryId: Joi.number().integer().allow(null).optional(),
  email: Joi.string().email().optional(),
  facebook: Joi.string().domain().optional().allow(''),
  id: Joi.number().integer().optional(),
  name: Joi.string().optional().allow('').allow(null),
  otpSecret: Joi.string().length(32).allow(null).allow('').optional(),
  region: Joi.string().allow(null).optional(),
  regionId: Joi.number().integer().allow(null).optional(),
  sessionType: Joi.string().allow('user', 'group'),
  showOnboarding: Joi.bool().optional(),
  token: Joi.string().length(6).optional(),
  twitter: Joi.string().domain().optional().allow(''),
  website: Joi.string().domain().optional().allow(''),
  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});

export const userSchema = baseAccountSchema.keys({
  bio: Joi.string().allow(null).optional(),
  language: Joi.string().alphanum().max(2).optional(),
  privateMemberships: Joi.bool().optional(),
  privateRSVP: Joi.bool().optional(),
  username: Joi.string().min(3).optional(),
});

export const groupSchema = baseAccountSchema.keys({
  category: Joi.string().allow('Political', 'Cooperative', 'Community', 'Union'),
  description: Joi.string().allow('').optional(),
  deletionDeadline: Joi.string().isoDate().allow(null).allow('').optional(),
  handle: Joi.string(),
  memberName: Joi.string().allow('').optional(),
  modName: Joi.string().allow('').optional(),
  type: Joi.string().allow('public', 'private', 'hidden'),
});
