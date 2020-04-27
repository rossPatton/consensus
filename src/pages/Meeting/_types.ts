import * as H from 'history';


export type tStore = {
  meeting: ts.thunk<ts.meetingSingular>,
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  group: ts.thunk<ts.group>,
  isLoading: boolean,
  roles: ts.thunk<ts.roleMap[]>,
  rsvps: ts.thunk<ts.rsvp[]>,
  session: ts.thunk<ts.session>
}

export type tProps = {
  meetingsByGroupId: ts.meeting[],
};

export type tComponentProps = tProps & {
  meeting: ts.meetingSingular,
  isDesktop: boolean,
  isMobile: boolean,
  group: ts.group,
  rsvp: ts.rsvp,
};

export type tContainerProps = tProps & {
  eventThunk: ts.thunk<ts.meetingSingular>,
  getMeetingDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  getGroupByIdDispatch: (query: ts.groupQuery) => ts.thunkPayload<ts.group>,
  getRolesDispatch: () => ts.thunkPayload<ts.roleMap>,
  getRsvpsDispatch: () => ts.thunkPayload<ts.rsvp[]>,
  location: H.Location,
  match: ts.match & { params: ts.meetingParams },
  groupThunk: ts.thunk<ts.group>,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  rsvpsThunk: ts.thunk<ts.rsvp[]>,
  session: ts.session,
}

