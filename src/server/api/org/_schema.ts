import Joi from '@hapi/joi';

export const schema = Joi.object({
  handle: Joi.string(),
  id: Joi.number().integer(),
});

export const patchSchema = schema.keys({
  allowNonVerified: Joi.bool(),
  category: Joi.string().allow('Political', 'Cooperative', 'Community', 'Union'),
  description: Joi.string(),
  facebook: Joi.string().uri(),
  memberName: Joi.string(),
  modName: Joi.string(),
  twitter: Joi.string().uri(),
  type: Joi.string().allow('public', 'private', 'hidden'),
  website: Joi.string().uri(),
});

export const postSchema = schema.keys({
  category:
    Joi.string().allow('Political', 'Cooperative', 'Community', 'Union').required(),
  city: Joi.string().required(),
  cityId: Joi.number().integer().required(),
  handle: Joi.string().regex(/[a-z0-9-]/).required(),
  login: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  region: Joi.string().required(),
  regionId: Joi.number().integer().required(),
  type: Joi.string().allow('public', 'private', 'hidden').required(),
});
