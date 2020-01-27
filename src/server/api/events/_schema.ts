import Joi from '@hapi/joi';

export const getSchema = Joi.object({
  date: Joi.date().timestamp(),
  exclude: Joi.string().regex(/^\d+$/),
  isDraft: Joi.string().alphanum(),
  isPublic: Joi.string().alphanum(),
  limit: Joi.string().regex(/^\d+$/),
  offset: Joi.string().regex(/^\d+$/),
  orgId: Joi.string().regex(/^\d+$/),
  showPast: Joi.string().alphanum(),
});

// export const deleteSchema = Joi.object({
//   id: Joi.string().regex(/^\d+$/).required(),
// });
