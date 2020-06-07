export type tStore = {
  geo: ts.thunk<ts.geo>,
  session: ts.thunk<ts.session>,
};

export type tProps = {
  geoThunk: ts.thunk<ts.geo>,
  session: ts.session,
};

