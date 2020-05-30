import Joi from '@hapi/joi';

// get group by userId
export const getSchema = Joi.object({
  noPending: Joi.bool(),
  userId: Joi.number().integer().required(),
});

// "delete" org by userId. ie, a user decides to leave an organization
export const deleteSchema = getSchema.keys({
  groupId: Joi.number().integer().required(),
});
