export type tProps = {
  geoThunk: tThunk<tGeo>,
  getGeoDispatch: () => tActionPayload<tGeo>,
  session: ts.session,
};
