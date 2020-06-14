import Joi from '@hapi/joi';

import {groupSchema} from '../_schemas';

export const schema = Joi.object({
  handle: Joi.string(),
  id: Joi.number().integer(),
});

export const patchSchema = groupSchema.keys({
  memberName: Joi.string(),
  modName: Joi.string(),
});

export const postSchema = groupSchema;
