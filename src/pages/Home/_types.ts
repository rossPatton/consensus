export type tStore = {
  meetingsByLocation: ts.thunk<ts.meeting[]>,
  geo: ts.thunk<ts.geo>,
  session: ts.thunk<ts.session>,
};

export type tProps = {
  meetingsByLocationThunk: ts.thunk<ts.meeting[]>,
  geoThunk: ts.thunk<ts.geo>,
  session: ts.session,
};

export type tContainerProps = tProps & {
  getMeetingsByLocationDispatch: (query: ts.meetingsByLocationQuery) => ts.thunkPayload<ts.meeting[]>,
  isLoading: boolean,
};
