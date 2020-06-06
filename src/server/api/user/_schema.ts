import Joi from '@hapi/joi';

import {userSchema} from '../_schemas';

// get user by id
export const getSchema = Joi.object({
  id: Joi.number().integer().optional(),
  username: Joi.string().required().min(3).optional(),
});

// post new user, ie user signup form
export const postSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().required().min(3),
});

export const patchSchema = userSchema;
