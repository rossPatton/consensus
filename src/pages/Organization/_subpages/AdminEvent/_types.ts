export type tState = {
  category: string,
  date: string,
  description: string,
  duration: string,
  featuredImage: File | null,
  id?: number,
  imagePreview: string | null,
  isDraft: boolean,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  orgName: string,
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
  isDraft: boolean,
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
  onSubmit: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  saveAsDraft: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  setImage: (ev: React.ChangeEvent<HTMLInputElement> | null) => void,
  toggleChecked: () => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
