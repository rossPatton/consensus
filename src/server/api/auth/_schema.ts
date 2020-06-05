import Joi from '@hapi/joi';

const baseSchema = Joi.object({
  avatar: Joi.string().allow(null).allow('').optional(),
  city: Joi.string().allow(null).optional(),
  cityId: Joi.number().integer().optional(),
  country: Joi.string().allow(null).optional(),
  countryId: Joi.number().integer().optional(),
  email: Joi.string().email().required(),
  facebook: Joi.string().allow('').optional(),
  id: Joi.number().integer().required(),
  otpSecret: Joi.string().allow('').optional(),
  region: Joi.string().allow(null).optional(),
  regionId: Joi.number().integer().optional(),
  showOnboarding: Joi.bool().optional(),
  sessionType: Joi.string().allow('user', 'group').required(),
  token: Joi.string().length(6),
  twitter: Joi.string().allow('').optional(),
  website: Joi.string().allow('').optional(),
  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});

export const userSchema = baseSchema.keys({
  bio: Joi.string(),
  language: Joi.string().alphanum().max(2),
  name: Joi.string(),
  privateEmail: Joi.bool(),
  privateMemberships: Joi.bool(),
  privateRSVP: Joi.bool(),
  username: Joi.string().required().min(3),
});

export const groupSchema = baseSchema.keys({
  category: Joi.string().allow('Political', 'Cooperative', 'Community', 'Union'),
  deletionDeadline: Joi.string().isoDate().allow(null).optional(),
  description: Joi.string().allow('').optional(),
  handle: Joi.string(),
  memberName: Joi.string(),
  modName: Joi.string(),
  name: Joi.string(),
  type: Joi.string().allow('public', 'private', 'hidden'),
});
