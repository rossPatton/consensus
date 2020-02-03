import Joi from '@hapi/joi';

// get orgs by userId
export const getSchema = Joi.object().keys({
  userId: Joi.number().integer(),
});

// "delete" org by userId. ie, a user decides to leave an organization
export const deleteSchema = getSchema.keys({
  orgId: Joi.number().integer(),
});
