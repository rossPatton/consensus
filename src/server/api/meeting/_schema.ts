import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  id: Joi.number().integer(),
  slug: Joi.string().regex(/^[a-zA-Z0-9-]+$/),
});

// upsert === postin or patchin
export const upsertSchema = Joi.object({
  category: Joi.string().valid('Community', 'Cooperative', 'Political', 'Union'),
  cityId: Joi.number().integer().required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().allow(''),
  endDate: Joi.string().isoDate(),
  host: Joi.string(),
  id: Joi.number().integer().allow(null).optional(),
  img: Joi.string().allow('').allow(null).optional(),
  isDraft: Joi.bool().optional(),
  isOnline: Joi.bool().optional(),
  isPrivate: Joi.bool().required(),
  location: Joi.string().allow(''),
  locationLink: Joi.string().allow(''),
  groupId: Joi.number().integer().required(),
  groupName: Joi.string().required(),
  slug: Joi.string().regex(/^[a-zA-Z0-9-]+$/),
  title: Joi.string().required(),
});
