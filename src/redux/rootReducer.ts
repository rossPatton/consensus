import { combineReducers } from 'redux';

import { authReducer } from './auth/reducer';
import { cityReducer } from './city/reducer';
import { countryReducer } from './country/reducer';
import { eventReducer } from './event/reducer';
import { eventsByOrgIdReducer } from './eventsByOrgId/reducer';
import { eventsByUserIdReducer } from './eventsByUserId/reducer';
import { geoReducer } from './geo/reducer';
import { orgReducer } from './org/reducer';
import { orgsReducer } from './orgs/reducer';
import { searchReducer } from './orgsBySearch/reducer';
import { orgsByUserIdReducer } from './orgsByUserId/reducer';
import { regionReducer } from './region/reducer';
import { rolesReducer } from './roles/reducer';
import { rsvpsReducer } from './rsvps/reducer';
import { userReducer } from './user/reducer';
import { usersByOrgIdReducer } from './usersByOrgId/reducer';

export const rootReducer = combineReducers({
  city: cityReducer,
  country: countryReducer,
  event: eventReducer,
  eventsByOrgId: eventsByOrgIdReducer,
  eventsByUserId: eventsByUserIdReducer,
  geo: geoReducer,
  org: orgReducer,
  orgs: orgsReducer,
  orgsByUserId: orgsByUserIdReducer,
  region: regionReducer,
  roles: rolesReducer,
  rsvps: rsvpsReducer,
  search: searchReducer,
  session: authReducer,
  user: userReducer,
  usersByOrgId: usersByOrgIdReducer,
});
