import { combineReducers } from 'redux';

import { checkedReducer } from './checked/reducer';
import { citiesReducer } from './cities/reducer';
import { cityReducer } from './city/reducer';
import { countryReducer } from './country/reducer';
import { geoReducer } from './geo/reducer';
import { groupReducer } from './group/reducer';
import { groupsReducer } from './groups/reducer';
import { groupsBySearchReducer } from './groupsBySearch/reducer';
import { groupsByUserIdReducer } from './groupsByUserId/reducer';
import { invitesReducer } from './invites/reducer';
import { meetingReducer } from './meeting/reducer';
import { meetingsReducer } from './meetings/reducer';
import { meetingsByGroupIdReducer } from './meetingsByGroupId/reducer';
import { meetingsByLocationReducer } from './meetingsByLocation/reducer';
import { meetingsByUserIdReducer } from './meetingsByUserId/reducer';
import { regionReducer } from './region/reducer';
import { rolesReducer } from './roles/reducer';
import { rsvpsReducer } from './rsvps/reducer';
import { sessionReducer } from './session/reducer';
import { tokenReducer } from './tokens/reducer';
import { uploadsReducer } from './uploads/reducer';
import { userReducer } from './user/reducer';
import { usersReducer } from './users/reducer';
import { usersByGroupIdReducer } from './usersByGroupId/reducer';

export const rootReducer = combineReducers({
  cities: citiesReducer,
  city: cityReducer,
  checked: checkedReducer,
  country: countryReducer,
  geo: geoReducer,
  group: groupReducer,
  groups: groupsReducer,
  groupsBySearch: groupsBySearchReducer,
  groupsByUserId: groupsByUserIdReducer,
  invites: invitesReducer,
  meeting: meetingReducer,
  meetings: meetingsReducer,
  meetingsByGroupId: meetingsByGroupIdReducer,
  meetingsByLocation: meetingsByLocationReducer,
  meetingsByUserId: meetingsByUserIdReducer,
  region: regionReducer,
  roles: rolesReducer,
  rsvps: rsvpsReducer,
  session: sessionReducer,
  tokens: tokenReducer,
  uploads: uploadsReducer,
  user: userReducer,
  users: usersReducer,
  usersByGroupId: usersByGroupIdReducer,
});
