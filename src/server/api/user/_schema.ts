import Joi from '@hapi/joi';

// get user by id
export const getSchema = Joi.object({
  id: Joi.number().integer().optional(),
  username: Joi.string().required().min(3).optional(),
});

// post new user, ie user signup form
export const postSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().required().min(3),
});

export const patchSchema = Joi.object({
  avatar: Joi.string().allow(null).allow('').optional(),
  bio: Joi.string().optional(),
  city: Joi.string().allow(null).optional(),
  cityId: Joi.number().integer().optional(),
  country: Joi.string().allow(null).optional(),
  countryId: Joi.number().integer().optional(),
  email: Joi.string().email().optional(),
  facebook: Joi.string().optional(),
  id: Joi.number().integer().required(),
  language: Joi.string().alphanum().max(2).optional(),
  name: Joi.string().optional(),
  otpSecret: Joi.string().allow('').optional(),
  privateMemberships: Joi.bool().optional(),
  privateRSVP: Joi.bool().optional(),
  region: Joi.string().allow(null).optional(),
  regionId: Joi.number().integer().optional(),
  token: Joi.string().length(6).optional(),
  username: Joi.string().min(3).optional(),
  twitter: Joi.string().optional(),
  website: Joi.string().optional(),
  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
