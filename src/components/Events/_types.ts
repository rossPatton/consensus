type tProps = {
  count?: number,
  events: tEvent[],
  // render alternative version
  horizontal?: boolean,
  // just because eslint complains about using role with non-ARIA strings
  sessionRole?: tRole,
  showOrgName?: boolean,
  showRSVPs?: boolean,
};

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = tProps & {
  deleteEventDispatch: (query: tIdQuery) => tThunkPayload,
  session: tSession,
  type?: 'drafts' | 'events',
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
  // if user is an admin, they can edit events
  isEditable?: boolean,
};


