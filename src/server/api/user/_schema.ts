import Joi from '@hapi/joi';

// get user by id
export const getSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
});

// post new user, ie user signup form
export const postSchema = Joi.object().keys({
  email: Joi.string().email().optional(),
  login: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const patchSchema = Joi.object().keys({
  bio: Joi.string(),
  city: Joi.string(),
  cityId: Joi.number().integer(),
  // lives in a separate table
  email: Joi.string().email(),
  facebook: Joi.string(),
  id: Joi.number().integer().required(),
  language: Joi.string().alphanum().max(2),
  name: Joi.string(),
  password: Joi.string().required(),
  phone: Joi.string(),
  privateEmail: Joi.bool(),
  privateMemberships: Joi.bool(),
  privateRSVP: Joi.bool(),
  username: Joi.string(),
  twitter: Joi.string(),
  website: Joi.string(),

  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
