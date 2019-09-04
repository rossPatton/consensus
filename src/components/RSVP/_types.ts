export type tContainerProps = {
  event: tEvent,
  setRsvp: (query: {id: number, value: boolean}) => void,
};

export type tState = {
  rsvp: boolean,
};

export type tComponentProps = {
  id: number,
  rsvp: boolean,
  setRsvp: (whatever: any) => void,
};
