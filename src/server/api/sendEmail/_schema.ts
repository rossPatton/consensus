import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  content: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
});
