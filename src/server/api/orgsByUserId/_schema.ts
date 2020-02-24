import Joi from '@hapi/joi';

// get orgs by userId
export const getSchema = Joi.object().keys({
  noPending: Joi.bool(),
  userId: Joi.number().integer().required(),
});

// "delete" org by userId. ie, a user decides to leave an organization
export const deleteSchema = getSchema.keys({
  orgId: Joi.number().integer().required(),
});
