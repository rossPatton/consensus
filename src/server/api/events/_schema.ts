import Joi from '@hapi/joi';

const baseSchema = Joi.object().keys({
  isFormSubmit: Joi.bool(),
});

export const getSchema = baseSchema.keys({
  date: Joi.date().timestamp(),
  exclude: Joi.number().integer(),
  isDraft: Joi.bool(),
  isPrivate: Joi.bool(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  orgId: Joi.number().integer(),
  showPast: Joi.string().alphanum(),
});

export const deleteSchema = baseSchema.keys({
  id: Joi.number().integer().required(),
});

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
