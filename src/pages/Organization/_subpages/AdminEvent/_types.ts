export type tState = {
  category: string,
  date: string,
  description: string,
  duration: string,
  featuredImage: File | null,
  imagePreview: string | null,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  time: string,
  title: string,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tCreateEvent = {
  category: string,
  date: string,
  description: string,
  endDate: string,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  orgId: number,
  title: string,
};

export type tContainerProps = {
  createEvent: (event: tCreateEvent) => Promise<{payload: tEvent}>,
  events: tEvent[],
  org: tOrg,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  setImage: (ev: React.ChangeEvent<HTMLInputElement> | null) => void,
  toggleChecked: () => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
