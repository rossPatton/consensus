type tProps = {
  count?: number,
  meetings: tMeeting[],
  // render alternative version
  horizontal?: boolean,
  // just because eslint complains about using role with non-ARIA strings
  sessionRole?: ts.role,
  showOrgName?: boolean,
  showRSVPs?: boolean,
};

export type tStore = {
  session: tThunk<ts.session>,
};

export type tContainerProps = tProps & {
  deleteEventDispatch: (query: tIdQuery) => tThunkPayload,
  session: ts.session,
  // admin drafts vs plain meetings vs user meeting RSVPs
  type?: 'drafts' | 'meetings' | 'rsvps',
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit meetings
  isEditable?: boolean,
};


