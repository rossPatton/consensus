export type tProps = {
  geoThunk: ts.thunk<ts.geo>,
  getGeoDispatch: () => ts.payload<ts.geo>,
  session: ts.session,
};
