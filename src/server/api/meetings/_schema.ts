import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  date: Joi.date().timestamp(),
  exclude: Joi.number().integer(),
  groupId: Joi.number().integer(),
  isDraft: Joi.bool(),
  isPrivate: Joi.bool(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  role: Joi.string().valid('pending', 'member', 'facilitator', 'admin', 'n/a'),
  showPast: Joi.string().alphanum(),
});

export const deleteSchema = Joi.object({
  id: Joi.number().integer().required(),
});

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
  slug: Joi.string(),
  tag: Joi.string().valid(
    'Meeting',
    'March',
    'Rally',
    'Direct Action',
    'Protest',
    'Strike',
    'Picket',
    'Vote',
    'Election',
  ),
  title: Joi.string().required(),
});
