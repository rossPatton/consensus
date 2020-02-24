import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

export const postSchema = Joi.object({
  eventId: Joi.number().integer().required(),
  type: Joi.string().valid('public', 'private').required(),
  value: Joi.string().valid('yes', 'no', 'maybe', '').required(),
});