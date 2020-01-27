import Joi from '@hapi/joi';

export const postSchema = Joi.object({
  eventId: Joi.number().integer().required(),
  type: Joi.string().alphanum().required(),
  value: Joi.string().alphanum().required(),
});
