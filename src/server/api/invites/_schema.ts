import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  groupId: Joi.number().integer().greater(0).optional(),
  id: Joi.number().integer().optional(),
  userId: Joi.number().integer().greater(0).optional(),
  type: Joi.string().valid('member', 'mod').optional(),
});

export const postSchema = getSchema.keys({
  username: Joi.string().optional(),
});

export const deleteSchema = postSchema;
export const patchSchema = postSchema;
