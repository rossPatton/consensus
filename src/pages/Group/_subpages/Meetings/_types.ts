

type tProps = {
  group: ts.group,
  role: ts.role,
};

export type tComponentProps = ts.searchFilterProps & tProps & {
  meetings: ts.meeting[],
  hideMeetings: boolean,
  type: ts.groupRouteParams['section'];
};

export type tContainerProps = tProps & {
  getMeetingsByGroupIdDispatch:
    (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  meetingsByGroupIdThunk: ts.thunk<ts.meeting[]>,
  match: ts.match & {params: ts.groupRouteParams},
  session: ts.session,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};
