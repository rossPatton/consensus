import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

export const postSchema = Joi.object({
  eventId: Joi.number().integer().required(),
  rsvpType: Joi.string().alphanum().required(),
  value: Joi.string().alphanum().required(),
});
