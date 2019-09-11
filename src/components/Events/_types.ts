export type tProps = {
  events: tEvent[],
  // if user is an admin, they can edit events
  isEditable?: boolean,
  session: tSession,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tContainerProps = tProps & {
  // redux
  deleteEvent: (query: {id: number}) => void,
  org: tOrg,
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
};

