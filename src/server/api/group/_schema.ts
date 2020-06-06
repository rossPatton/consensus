import Joi from '@hapi/joi';

import {groupSchema} from '../_schemas';

export const schema = Joi.object({
  handle: Joi.string(),
  id: Joi.number().integer(),
});

export const patchSchema = groupSchema;

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
