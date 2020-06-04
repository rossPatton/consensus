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
  bio: Joi.string(),
  city: Joi.string().allow(null).optional(),
  cityId: Joi.number().integer().optional(),
  country: Joi.string().allow(null).optional(),
  countryId: Joi.number().integer().optional(),
  facebook: Joi.string(),
  id: Joi.number().integer().required(),
  language: Joi.string().alphanum().max(2),
  name: Joi.string(),
  phone: Joi.string(),
  privateMemberships: Joi.bool(),
  privateRSVP: Joi.bool(),
  region: Joi.string().allow(null).optional(),
  regionId: Joi.number().integer().optional(),
  username: Joi.string().required().min(3),
  twitter: Joi.string(),
  website: Joi.string(),
  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
