export type tStore = {
  eventsByLocation: tThunk<tEvent[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tProps = {
  eventsByLocation: tThunk<tEvent[]>,
  geo: tGeo,
  isLoading: boolean,
}

export type tContainerProps = tProps & {
  getEventsByLocationDispatch: (query: any) => tThunkPayload<any>,
  getGeoDispatch: () => tThunkPayload<tGeo>,
  session: tSession,
};
