import Joi from '@hapi/joi';

export const schema = Joi.object({
  id: Joi.number().integer().required(),
});
