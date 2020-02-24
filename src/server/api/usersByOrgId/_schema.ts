import Joi from '@hapi/joi';

const baseSchema = Joi.object().keys({
  isFormSubmit: Joi.bool(),
});

export const getSchema = baseSchema.keys({
  orgId: Joi.number().integer(),
});

export const postSchema = getSchema.keys({
  userId: Joi.number().integer(),
  role: Joi.string().alphanum(),
});

export const deleteSchema = postSchema;
export const patchSchema = postSchema;
