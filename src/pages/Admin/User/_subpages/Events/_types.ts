export type tStore = {
  eventsByUserId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tComponentProps = {
  events: tEvent[],
  onSearchChange: tSelectChange,
};

export type tContainerProps = {
  eventsByUserIdThunk: tThunk<tEvent[]>,
  getEventsByUserIdDispatch: (query: {userId: number}) => tThunkPayload<tEvent[]>,
  sessionThunk: tThunk<tSession>,
};
