export type tStore = {
  eventsByLocation: tThunk<tEvent[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tProps = {
  eventsByLocationThunk: tThunk<tEvent[]>,
  isLoading: boolean,
};

export type tComponentProps = tProps & {
  geo: tGeo,
};

export type tContainerProps = tProps & {
  geoThunk: tThunk<tGeo>,
  getEventsByLocationDispatch: (query: tGeo) => tThunkPayload<tEvent[]>,
  session: tSession,
};
