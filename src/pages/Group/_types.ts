import {Location} from 'history';


export type tProps = {
  location: Location,
  match: ts.match & {params: ts.groupRouteParams},
  session: ts.session,
};

export type tComponentProps = tProps & {
  group: ts.group,
  role: ts.role,
};

export type tContainerProps = tProps & {
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  getGroupDispatch: (query: ts.groupQuery) => ts.thunkPayload<ts.group>,
  getRolesDispatch: () => ts.thunkPayload<ts.roleMap[]>,
  getRsvpsDispatch: () => ts.thunkPayload<ts.rsvp[]>,
  isLoading: boolean,
  groupThunk: ts.thunk<ts.group>,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  rsvpsThunk: ts.thunk<ts.rsvp[]>,
  session: ts.session,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  group: ts.thunk<ts.group>,
  roles: ts.thunk<ts.roleMap[]>,
  rsvps: ts.thunk<ts.rsvp[]>,
  session: ts.thunk<ts.session>,
};
