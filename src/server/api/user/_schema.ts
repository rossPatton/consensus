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
  country: Joi.string(),
  email: Joi.string().email(),
  id: Joi.number().integer().required(),
  language: Joi.string().alphanum().max(2),
  name: Joi.string(),
  password: Joi.string().required(),
  phone: Joi.string(),
  privateEmail: Joi.bool(),
  privateLocation: Joi.bool(),
  privateMemberships: Joi.bool(),
  privatePhone: Joi.bool(),
  privateRSVP: Joi.bool(),
  region: Joi.string(),
  username: Joi.string(),

  created_at: Joi.date().timestamp(),
  updated_at: Joi.date().timestamp(),
});
