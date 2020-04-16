export type tStore = {
  eventsByLocation: tThunk<tEvent[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tProps = {
  eventsByLocationThunk: tThunk<tEvent[]>,
  geoThunk: tThunk<tGeo>,
  session: tSession,
};

export type tContainerProps = tProps & {
  getEventsByLocationDispatch: (query: tGeo) => tThunkPayload<tEvent[]>,
  isLoading: boolean,
};
