import Joi from '@hapi/joi';

export const schema = Joi.object({
  isFormSubmit: Joi.bool().optional(),
});
