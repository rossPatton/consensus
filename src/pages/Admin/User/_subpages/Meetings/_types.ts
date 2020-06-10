export type tStore = {
  geo: ts.thunk<ts.geo>,
  meetingsByLocation: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};

export type tComponentProps = {
  location: string,
  meetings: ts.meeting[],
  onFilterOptionChange: ts.selectChange,
  onSearchChange: ts.inputChange,
};

export type tContainerProps = {
  geoThunk: ts.thunk<ts.geo>,
  meetingsByLocationThunk: ts.thunk<ts.meeting[]>,
  getMeetingsByLocationDispatch:
    (query: ts.meetingsByLocationQuery) => ts.thunkPayload<ts.meeting[]>,
  sessionThunk: ts.thunk<ts.session>,
};
