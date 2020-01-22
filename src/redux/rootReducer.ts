import { combineReducers } from 'redux';

import { getCityReducer } from './async/city/reducer';
import { getCountryReducer } from './async/country/reducer';
import { eventsReducer } from './async/events/reducer';
import { getEventByIdReducer } from './async/getEventById/reducer';
import { orgReducer } from './async/org/reducer';
import { orgsReducer } from './async/orgs/reducer';
import { getRegionReducer } from './async/region/reducer';
import { registerUserReducer } from './async/registerUser/reducer';
import { rolesReducer } from './async/roles/getRoles/reducer';
import { rsvpsReducer } from './async/rsvps/getRsvps/reducer';
import { searchReducer } from './async/search/reducer';
import { sessionReducer } from './async/session/reducer';
import { updateUserReducer } from './async/updateUser/reducer';
import { userReducer } from './async/user/reducer';
import { usersByOrgReducer } from './async/usersByOrg/reducer';

export const rootReducer = combineReducers({
  city: getCityReducer,
  country: getCountryReducer,
  event: getEventByIdReducer,
  events: eventsReducer,
  org: orgReducer,
  orgs: orgsReducer,
  region: getRegionReducer,
  registerUser: registerUserReducer,
  roles: rolesReducer,
  rsvps: rsvpsReducer,
  search: searchReducer,
  session: sessionReducer,
  updateUser: updateUserReducer,
  user: userReducer,
  usersByOrg: usersByOrgReducer,
});
