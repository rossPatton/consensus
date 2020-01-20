import { combineReducers } from 'redux';

import { getCityReducer } from './async/city/reducer';
import { getCountryReducer } from './async/country/reducer';
// import { getDecisionReducer } from './async/decision/reducer';
import { eventsReducer } from './async/events/reducer';
// import { getDecisionsByOrgReducer } from './async/getDecisionsByOrg/reducer';
import { getEventByIdReducer } from './async/getEventById/reducer';
import { orgReducer } from './async/org/reducer';
import { orgsReducer } from './async/orgs/reducer';
import { getRegionReducer } from './async/region/reducer';
import { registerUserReducer } from './async/registerUser/reducer';
import { rolesReducer } from './async/roles/reducer';
import { rsvpsReducer } from './async/rsvps/getRsvps/reducer';
import { searchReducer } from './async/search/reducer';
import { authenticateSessionReducer } from './async/session/reducer';
import { updateUserReducer } from './async/updateUser/reducer';
import { userReducer } from './async/user/reducer';
// import { userDecisionsReducer } from './async/userDecisions/reducer';
import { usersReducer } from './async/users/reducer';
import { usersByOrgReducer } from './async/usersByOrg/reducer';

export const rootReducer = combineReducers({
  city: getCityReducer,
  country: getCountryReducer,
  // decision: getDecisionReducer,
  // decisions: getDecisionsByOrgReducer,
  event: getEventByIdReducer,
  events: eventsReducer,
  org: orgReducer,
  orgs: orgsReducer,
  region: getRegionReducer,
  registerUser: registerUserReducer,
  roles: rolesReducer,
  rsvps: rsvpsReducer,
  search: searchReducer,
  session: authenticateSessionReducer,
  updateUser: updateUserReducer,
  user: userReducer,
  users: usersReducer,
  usersByOrg: usersByOrgReducer,
  // votes: userDecisionsReducer,
});
