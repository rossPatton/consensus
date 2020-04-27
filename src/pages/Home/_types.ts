export type tStore = {
  meetingsByLocation: tThunk<tMeeting[]>,
  geo: tThunk<tGeo>,
  session: tThunk<ts.session>,
};

export type tProps = {
  meetingsByLocationThunk: tThunk<tMeeting[]>,
  geoThunk: tThunk<tGeo>,
  session: ts.session,
};

export type tContainerProps = tProps & {
  getMeetingsByLocationDispatch: (query: tMeetingsByLocationQuery) => tThunkPayload<tMeeting[]>,
  isLoading: boolean,
};
