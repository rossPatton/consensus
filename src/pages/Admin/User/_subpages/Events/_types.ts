export type tProps = {
  events: tEvent[],
};

export type tContainerProps = tProps & {
  getEventsByUser: () => void,
  session: tSession,
};
