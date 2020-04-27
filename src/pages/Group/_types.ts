import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & {params: tGroupRouteParams},
  session: ts.session,
};

export type tComponentProps = tProps & {
  group: tGroup,
  role: ts.role,
};

export type tContainerProps = tProps & {
  getMeetingsByGroupIdDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeeting[]>,
  getGroupDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  getRolesDispatch: () => tThunkPayload<ts.roleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  groupThunk: tThunk<tGroup>,
  rolesThunk: tThunk<ts.roleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: ts.session,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  group: tThunk<tGroup>,
  roles: tThunk<ts.roleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<ts.session>,
};
