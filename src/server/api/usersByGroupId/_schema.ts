import Joi from '@hapi/joi';

const baseSchema = Joi.object().keys({
  isFormSubmit: Joi.bool(),
});

export const getSchema = baseSchema.keys({
  noPending: Joi.bool(),
  groupId: Joi.number().integer(),
});

export const postSchema = getSchema.keys({
  allowNonVerified: Joi.bool(),
  userId: Joi.number().integer(),
  role: Joi.string().alphanum(),
});

export const deleteSchema = postSchema;
export const patchSchema = postSchema;