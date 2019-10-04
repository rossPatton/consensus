export type tProps = {
  events: tEvent[],
  // if user is an admin, they can edit events
  isEditable?: boolean,
  role?: tRole,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tContainerProps = tProps & {
  deleteEvent: (query: tIdQuery) => void,
};

export type tComponentProps = tProps & {
  deleteEvent: (ev: React.MouseEvent, id: number) => void,
};

