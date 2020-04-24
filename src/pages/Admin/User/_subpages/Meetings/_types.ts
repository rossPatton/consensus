export type tStore = {
  meetingsByUserId: tThunk<tMeeting[]>,
  session: tThunk<tSession>,
};

export type tComponentProps = {
  meetings: tMeeting[],
  onFilterOptionChange: tSelectChange,
  onSearchChange: tInputChange,
};

export type tContainerProps = {
  meetingsByUserIdThunk: tThunk<tMeeting[]>,
  getMeetingsByUserIdDispatch: (query: {userId: number}) => tThunkPayload<tMeeting[]>,
  sessionThunk: tThunk<tSession>,
};
