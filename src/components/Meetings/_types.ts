type tProps = {
  count?: number,
  meetings: ts.meeting[],
  // render alternative version
  horizontal?: boolean,
  // just because eslint complains about using role with non-ARIA strings
  sessionRole?: ts.role,
  showOrgName?: boolean,
  showRSVPs?: boolean,
};

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tProps & {
  deleteEventDispatch: (query: ts.idQuery) => ts.thunkPayload,
  session: ts.session,
  // realistically just 3 options:
  // admin 'drafts' vs plain 'meetings' vs user meeting 'rsvps'
  type?: ts.groupRouteParams['section'] | 'rsvps';
};

export type tComponentProps = ts.mediaContext & tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit meetings
  isEditable?: boolean,
};


