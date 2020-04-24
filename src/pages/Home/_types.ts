export type tStore = {
  meetingsByLocation: tThunk<tMeeting[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};

export type tProps = {
  meetingsByLocationThunk: tThunk<tMeeting[]>,
  geoThunk: tThunk<tGeo>,
  session: tSession,
};

export type tContainerProps = tProps & {
  getMeetingsByLocationDispatch: (query: tGeo) => tThunkPayload<tMeeting[]>,
  isLoading: boolean,
};
