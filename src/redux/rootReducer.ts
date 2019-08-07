import { combineReducers } from 'redux';

import { sessionReducer } from './sync/session/reducer';

import { authenticateSessionReducer } from './async/session/reducer';
import { getDecisionsByOrgReducer } from './async/getDecisionsByOrg/reducer';
import { getEventsByOrgReducer } from './async/getEventsByOrg/reducer';
import { getOrgReducer } from './async/getOrg/reducer';
import { getUsersByOrgReducer } from './async/getUsersByOrg/reducer';
import { getUsersReducer } from './async/getUsers/reducer';
import { registerUserReducer } from './async/registerUser/reducer';
import { updateUserReducer } from './async/updateUser/reducer';

export const rootReducer = combineReducers({
  auth: authenticateSessionReducer,
  decisions: getDecisionsByOrgReducer,
  events: getEventsByOrgReducer,
  org: getOrgReducer,
  registerUser: registerUserReducer,
  session: sessionReducer,
  updateUser: updateUserReducer,
  users: getUsersReducer,
  usersByOrg: getUsersByOrgReducer,
});
