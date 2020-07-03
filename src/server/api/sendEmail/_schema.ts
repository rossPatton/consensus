import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  content: Joi.string().required(),
  from: Joi.string(),
  html: Joi.string(),
  recipientVariables: Joi.string().optional(),
  subject: Joi.string().required(),
  text: Joi.string(),
  to: Joi.string(),
});
