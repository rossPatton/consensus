import Joi from '@hapi/joi';

export const postSchema = Joi.object({
  meetingId: Joi.number().integer().required(),
  type: Joi.string().alphanum().required(),
  value: Joi.string().valid('yes', 'no', 'maybe').optional(),
});
