import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  noPending: Joi.bool(),
  groupId: Joi.number().integer(),
});

export const postSchema = getSchema.keys({
  userId: Joi.number().integer(),
  role: Joi.string().valid('pending', 'member', 'facilitator', 'admin', 'n/a'),
});

export const deleteSchema = postSchema;
export const patchSchema = postSchema;
