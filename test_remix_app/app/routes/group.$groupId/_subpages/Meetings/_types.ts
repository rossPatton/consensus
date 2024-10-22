

type tProps = {
  group: ts.group,
  role: ts.role,
};

export type tComponentProps = ts.searchFilterProps
  & ts.publishedFilterProps
  & tProps & {
  meetings: ts.meeting[],
  hideMeetings: boolean,
  type: ts.groupRouteParams['section'];
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: ts.thunk<ts.meeting[]>,
  match: ts.match & {params: ts.groupRouteParams},
  session: ts.session,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};
