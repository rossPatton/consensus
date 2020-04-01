export type tStore = {
  eventsByLocation: tThunk<tEvent[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tProps = {
  eventsByLocationThunk: tThunk<tEvent[]>,
  isLoading: boolean,
  session: tSession,
};

export type tComponentProps = tProps & {
  geo: tGeo,
};

export type tContainerProps = tProps & {
  geoThunk: tThunk<tGeo>,
  getEventsByLocationDispatch: (query: tGeo) => tThunkPayload<tEvent[]>,
};
