export type tStore = {
  eventsByUserId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tComponentProps = tPrivacyFilterProps & tSearchFilterProps & {
  events: tEvent[],
};

export type tContainerProps = {
  eventsByUserIdThunk: tThunk<tEvent[]>,
  getEventsByUserIdDispatch: (query: {userId: number}) => tThunkPayload<tEvent[]>,
  sessionThunk: tThunk<tSession>,
};
