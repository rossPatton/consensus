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
  group: ts.group,
  rsvp: ts.rsvp,
};

export type tContainerProps = tProps & {
  isLoading: boolean,
  meetingThunk: ts.thunk<ts.meetingSingular>,
  getMeetingDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  getGroupByIdDispatch: (query: ts.getGroupQuery) => ts.thunkPayload<ts.group>,
  location: H.Location,
  match: ts.match & { params: ts.meetingParams },
  groupThunk: ts.thunk<ts.group>,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  rsvpsThunk: ts.thunk<ts.rsvp[]>,
  session: ts.session,
}

