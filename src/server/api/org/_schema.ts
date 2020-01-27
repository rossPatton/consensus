import Joi from '@hapi/joi';

export const schema = Joi.object({
  id: Joi.string().regex(/^\d+$/),
});
