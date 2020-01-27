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
  bio: Joi.string().alphanum(),
  city: Joi.string().alphanum(),
  country: Joi.string().alphanum(),
  email: Joi.string().email(),
  language: Joi.string().alphanum().max(2),
  name: Joi.string(),
  phone: Joi.string(),
  privateEmail: Joi.bool(),
  privateLocation: Joi.bool(),
  privateMemberships: Joi.bool(),
  privateName: Joi.bool(),
  privateRSVP: Joi.bool(),
  region: Joi.string().alphanum(),
  username: Joi.string(),
});
