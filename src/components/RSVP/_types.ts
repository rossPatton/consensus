export type tSetRsvpOpts = {
  ev: React.ChangeEvent,
  eventId: number,
  value: boolean,
};

export type tState = {
  rsvp: boolean,
};

export type tContainerProps = {
  event: tEvent,
  setRsvp: (query: {id: number, value: boolean}) => void,
};

export type tComponentProps = {
  id: number,
  rsvp: boolean,
  setRsvp: (whatever: any) => void,
};
