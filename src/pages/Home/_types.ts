export type tStore = {
  geo: ts.thunk<ts.geo>,
  meetings: ts.thunk<ts.meeting[]>,
};

export type tProps = {
  geoThunk: ts.thunk<ts.geo>,
  meetings: ts.meeting[],
};

export type tContainerProps = tProps & {
  getMeetingsDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
};


