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
  groupId: Joi.number().integer(),
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
  slug: Joi.string(),
  title: Joi.string().required(),
});
