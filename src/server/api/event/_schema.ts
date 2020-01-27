import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  id: Joi.string().regex(/^\d+$/),
});
