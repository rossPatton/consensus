import Joi from '@hapi/joi';

export const schema = Joi.object({
  region: Joi.string().optional(),
});
