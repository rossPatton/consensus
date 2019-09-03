import { combineReducers } from 'redux';

import { getCityReducer } from './async/city/reducer';
import { getCountryReducer } from './async/country/reducer';
import { eventsReducer } from './async/events/reducer';
import { getDecisionsByOrgReducer } from './async/getDecisionsByOrg/reducer';
import { getEventByIdReducer } from './async/getEventById/reducer';
import { getOrgReducer } from './async/getOrg/reducer';
import { getRegionReducer } from './async/region/reducer';
import { registerUserReducer } from './async/registerUser/reducer';
import { roleReducer } from './async/role/reducer';
import { rsvpsReducer } from './async/rsvps/reducer';
import { authenticateSessionReducer } from './async/session/reducer';
import { updateUserReducer } from './async/updateUser/reducer';
import { userReducer } from './async/user/reducer';
import { usersReducer } from './async/users/reducer';
import { usersByOrgReducer } from './async/usersByOrg/reducer';

export const rootReducer = combineReducers({
  city: getCityReducer,
  country: getCountryReducer,
  decisions: getDecisionsByOrgReducer,
  event: getEventByIdReducer,
  events: eventsReducer,
  org: getOrgReducer,
  region: getRegionReducer,
  registerUser: registerUserReducer,
  role: roleReducer,
  rsvps: rsvpsReducer,
  session: authenticateSessionReducer,
  updateUser: updateUserReducer,
  user: userReducer,
  users: usersReducer,
  usersByOrg: usersByOrgReducer,
});
