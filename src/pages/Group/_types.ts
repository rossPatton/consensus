import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & {params: tGroupRouteParams},
  session: tSession,
};

export type tComponentProps = tProps & {
  group: tGroup,
  role: tRole,
};

export type tContainerProps = tProps & {
  getMeetingsByGroupIdDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeeting[]>,
  getGroupDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  groupThunk: tThunk<tGroup>,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  group: tThunk<tGroup>,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
};
