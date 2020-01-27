import Joi from '@hapi/joi';

export const getSchema = Joi.object().keys({
  orgId: Joi.number().integer(),
});

export const postSchema = getSchema.keys({
  userId: Joi.number().integer(),
});

export const patchSchema = postSchema.keys({
  role: Joi.string().alphanum(),
});

export const deleteSchema = postSchema;
