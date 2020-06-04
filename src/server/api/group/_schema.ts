import Joi from '@hapi/joi';

export const schema = Joi.object({
  handle: Joi.string(),
  id: Joi.number().integer(),
});

export const patchSchema = schema.keys({
  avatar: Joi.string().allow('').allow(null),
  category: Joi.string().allow('Political', 'Cooperative', 'Community', 'Union'),
  description: Joi.string(),
  deletionDeadline: Joi.string().isoDate().allow(null).optional(),
  facebook: Joi.string().uri(),
  showOnboarding: Joi.bool().optional(),
  memberName: Joi.string(),
  modName: Joi.string(),
  token: Joi.string(),
  twitter: Joi.string().uri(),
  type: Joi.string().allow('public', 'private', 'hidden'),
  website: Joi.string().uri(),
});

export const postSchema = schema.keys({
  category:
    Joi.string().allow('Political', 'Cooperative', 'Community', 'Union').required(),
  city: Joi.string().required(),
  cityId: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  handle: Joi.string().regex(/[a-z0-9-]/).required(),
  name: Joi.string().required(),
  region: Joi.string().required(),
  regionId: Joi.number().integer().required(),
  type: Joi.string().allow('public', 'private', 'hidden').required(),
});
