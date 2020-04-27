

type tProps = {
  group: ts.group,
  role: ts.role,
};

export type tComponentProps = ts.searchFilterProps & tProps & {
  meetings: ts.meeting[],
  hideMeetings: boolean,
  type: 'drafts' | 'meetings',
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: ts.thunk<ts.meeting[]>,
  isLoading: boolean,
  match: ts.match & {params: ts.groupRouteParams},
  session: ts.session<ts.user | ts.group>,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session<ts.user | ts.group>>,
};
