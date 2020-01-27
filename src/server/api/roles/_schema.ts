import Joi from '@hapi/joi';

export const schema = Joi.object({
  accountId: Joi.number().integer().required(),
});
