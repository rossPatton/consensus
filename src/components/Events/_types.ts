type tProps = {
  events: tEvent[],
  // just because eslint complains about using role with non-ARIA strings
  sessionRole?: tRole,
  // render mobile/sidebar version
  tiny?: boolean,
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


