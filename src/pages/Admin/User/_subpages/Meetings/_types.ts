export type tStore = {
  meetingsByUserId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};

export type tComponentProps = {
  meetings: ts.meeting[],
  onFilterOptionChange: ts.selectChange,
  onSearchChange: ts.inputChange,
};

export type tContainerProps = {
  meetingsByUserIdThunk: ts.thunk<ts.meeting[]>,
  getMeetingsByUserIdDispatch: (query: {userId: number}) => ts.thunkPayload<ts.meeting[]>,
  sessionThunk: ts.thunk<ts.session>,
};
