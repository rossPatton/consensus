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
