type tProps = {
  group: ts.group,
};

export type tState = {
  cohort: string,
  content: string,
  error: string,
  meetingIndex: number,
  subject: string,
};

export type tKeyUnion = keyof tState;

export type tComponentProps = tState & tProps & {
  meetings: ts.meeting[],
  sendEmail: (isTest?: boolean) => void,
  updateState: (key: tKeyUnion, value: string | number) => void,
};

export type tContainerProps = tProps & {
  getRsvpsDispatch: (query: any) => ts.thunkPayload<ts.rsvp[]>,
  meetingsByGroupIdThunk: ts.thunk<ts.meeting[]>,
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  getUsersDispatch: (query: any) => ts.thunkPayload<ts.user[]>,
  usersByGroupId: ts.user[],
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  usersByGroupId: ts.thunk<ts.user[]>,
};
