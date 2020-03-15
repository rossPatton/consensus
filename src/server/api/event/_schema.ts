import Joi from '@hapi/joi';

const baseSchema = Joi.object().keys({
  isFormSubmit: Joi.bool(),
});

export const getSchema = baseSchema.keys({
  id: Joi.number().integer(),
  slug: Joi.string().regex(/^[a-zA-Z0-9-]+$/),
});

// upsert === postin or patchin
export const upsertSchema = baseSchema.keys({
  category: Joi.string().valid('Community', 'Cooperative', 'Political', 'Union'),
  cityId: Joi.number().integer().required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().allow(''),
  endDate: Joi.string().isoDate(),
  id: Joi.number().integer(),
  isDraft: Joi.bool().optional(),
  isPrivate: Joi.bool().required(),
  location: Joi.string().allow(''),
  locationLink: Joi.string().allow(''),
  orgId: Joi.number().integer().required(),
  orgName: Joi.string().required(),
  slug: Joi.string(),
  title: Joi.string().required(),
});
