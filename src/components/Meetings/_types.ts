type tProps = {
  count?: number,
  // render alternative version
  horizontal?: boolean,
  // just because eslint complains about using role with non-ARIA strings
  sessionRole?: ts.role,
  showGroupName?: boolean,
  showPastToggle?: boolean,
  showRSVPs?: boolean,
};

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tProps & {
  deleteMeetingDispatch: (query: ts.idQuery) => ts.thunkPayload,
  meetings: ts.meeting[],
  session: ts.session,
  // realistically just 3 options:
  // admin 'drafts' vs plain 'meetings' vs user meeting 'rsvps'
  type?: ts.groupRouteParams['section'] | 'rsvps';
};

export type tComponentProps = ts.mediaContext & tProps & {
  deleteMeeting: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit meetings
  isEditable?: boolean,
  meetingsToRender: ts.meeting[],
  pastMeetings?: ts.meeting[],
  renderPast?: boolean,
  renderPastAsFallback?: boolean,
  togglePast: (renderPast: boolean) => void,
  upcomingMeetings?: ts.meeting[],
};


