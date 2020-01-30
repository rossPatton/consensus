import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  id: Joi.number().integer().required(),
});
