import Joi from '@hapi/joi';

export const patchSchema = Joi.object({
  email: Joi.string().email(),
  showOnboarding: Joi.bool().optional(),
});

export const postSchema = Joi.object({
  email: Joi.string().email().max(4096),
});

export const deleteSchema = Joi.object({
  id: Joi.number().integer().required(),
});
