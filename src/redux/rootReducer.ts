import { combineReducers } from 'redux';

import { citiesReducer } from './cities/reducer';
import { cityReducer } from './city/reducer';
import { countryReducer } from './country/reducer';
import { geoReducer } from './geo/reducer';
import { groupReducer } from './group/reducer';
import { groupsReducer } from './groups/reducer';
import { groupsBySearchReducer } from './groupsBySearch/reducer';
import { groupsByUserIdReducer } from './groupsByUserId/reducer';
import { meetingReducer } from './meeting/reducer';
import { meetingsByGroupIdReducer } from './meetingsByGroupId/reducer';
import { meetingsByLocationReducer } from './meetingsByLocation/reducer';
import { meetingsByUserIdReducer } from './meetingsByUserId/reducer';
import { regionReducer } from './region/reducer';
import { rolesReducer } from './roles/reducer';
import { rsvpsReducer } from './rsvps/reducer';
import { sessionReducer } from './session/reducer';
import { uploadsReducer } from './uploads/reducer';
import { userReducer } from './user/reducer';
import { usersByGroupIdReducer } from './usersByGroupId/reducer';

export const rootReducer = combineReducers({
  city: cityReducer,
  cities: citiesReducer,
  country: countryReducer,
  meeting: meetingReducer,
  meetingsByLocation: meetingsByLocationReducer,
  meetingsByGroupId: meetingsByGroupIdReducer,
  meetingsByUserId: meetingsByUserIdReducer,
  geo: geoReducer,
  group: groupReducer,
  groups: groupsReducer,
  groupsBySearch: groupsBySearchReducer,
  groupsByUserId: groupsByUserIdReducer,
  region: regionReducer,
  roles: rolesReducer,
  rsvps: rsvpsReducer,
  session: sessionReducer,
  uploads: uploadsReducer,
  user: userReducer,
  usersByGroupId: usersByGroupIdReducer,
});
