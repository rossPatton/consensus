export type tProps = {
  children: React.ReactNode,
  className?: string,
  geoThunk: ts.thunk<ts.geo>,
  getGeoDispatch: () => ts.payload<ts.geo>,
  getRolesDispatch: () => ts.thunkPayload<ts.roleMap>,
  getRsvpsDispatch: (query: any) => ts.thunkPayload<ts.rsvp[]>,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  rsvpsThunk: ts.thunk<ts.rsvp[]>,
  session: ts.session,
};

export type tStore = {
  geo: ts.thunk<ts.geo>,
  roles: ts.thunk<ts.roleMap[]>,
  rsvps: ts.thunk<ts.rsvp[]>,
  session: ts.thunk<ts.session>,
}
