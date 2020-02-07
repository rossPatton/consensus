export type tStore = {
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tComponentProps = {
  geo: tGeo,
  isLoading: boolean,
};

export type tContainerProps = {
  geo: tGeo,
  getGeoDispatch: () => tThunkPayload<tGeo>,
  isLoading: boolean,
  session: tSession,
};
