export type tProps = {
  match: ts.adminSectionParams,
};

export type tComponentProps = tProps
  & tPublishedFilterProps
  & tSearchFilterProps
  & {
    drafts: tMeeting[],
    meetings: tMeeting[],
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: tThunk<tMeeting[]>,
  getMeetingsByGroupIdDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeeting[]>,
  sessionThunk: tThunk<ts.session>,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  session: tThunk<ts.session>,
};
