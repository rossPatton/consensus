export type tProps = {
  match: ts.adminSectionParams,
};

export type tComponentProps = tProps
  & ts.publishedFilterProps
  & ts.searchFilterProps
  & {
    drafts: ts.meeting[],
    meetings: ts.meeting[],
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: ts.thunk<ts.meeting[]>,
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meeting[]>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};
