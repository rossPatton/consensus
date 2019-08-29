import { combineReducers } from 'redux';

import { getCityReducer } from './async/city/reducer';
import { getCountryReducer } from './async/country/reducer';
import { getDecisionsByOrgReducer } from './async/getDecisionsByOrg/reducer';
import { getEventByIdReducer } from './async/getEventById/reducer';
import { getEventsByOrgReducer } from './async/getEventsByOrg/reducer';
import { getOrgReducer } from './async/getOrg/reducer';
import { getUsersReducer } from './async/getUsers/reducer';
import { getUsersByOrgReducer } from './async/getUsersByOrg/reducer';
import { getRegionReducer } from './async/region/reducer';
import { registerUserReducer } from './async/registerUser/reducer';
import { authenticateSessionReducer } from './async/session/reducer';
import { updateUserReducer } from './async/updateUser/reducer';

export const rootReducer = combineReducers({
  decisions: getDecisionsByOrgReducer,
  city: getCityReducer,
  country: getCountryReducer,
  event: getEventByIdReducer,
  events: getEventsByOrgReducer,
  org: getOrgReducer,
  registerUser: registerUserReducer,
  region: getRegionReducer,
  session: authenticateSessionReducer,
  updateUser: updateUserReducer,
  users: getUsersReducer,
  usersByOrg: getUsersByOrgReducer,
});
