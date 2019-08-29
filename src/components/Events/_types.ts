export type tProps = {
  events: tEvent[],
  session: tSession,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tContainerProps = tProps & {
  setRsvpDispatch: (query: any) => Promise<any>,
};

export type tComponentProps = tProps & {
  setRsvp: (
    ev: React.FormEvent<HTMLFormElement>,
    eventId: number,
    value: boolean,
  ) => void,
};
