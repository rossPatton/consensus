import * as H from 'history';


export type tStore = {
  meeting: ts.thunk<ts.meetingSingular>,
  group: ts.thunk<ts.group>,
  isLoading: boolean,
  roles: ts.thunk<ts.roleMap[]>,
  session: ts.thunk<ts.session>
}

export type tComponentProps = {
  meeting: ts.meeting,
};

export type tContainerProps = {
  meetingThunk: ts.thunk<ts.meetingSingular>,
  getRolesDispatch: () => ts.thunkPayload<ts.roleMap>,
  isLoading: boolean,
  location: H.Location,
  match: ts.match & { params: ts.meetingParams },
  groupThunk: ts.thunk<ts.group>,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  session: ts.session,
}

