import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  content: Joi.string().required(),
  data: Joi.string().optional(),
  from: Joi.string(),
  html: Joi.string(),
  recipientVariables: Joi.string().optional(),
  subject: Joi.string().required(),
  template: Joi.string().allow('announcement', 'group').optional(),
  text: Joi.string(),
  to: Joi.string(),
});
