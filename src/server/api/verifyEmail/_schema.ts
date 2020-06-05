import Joi from '@hapi/joi';

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});
