export type tState = {
  category: string,
  date: string,
  description: string,
  duration: string,
  imagePreview: string,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  time: string,
  title: string,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  session: tSession,
}

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  createEvent: (event: any) => Promise<any>,
  events: tEvent[],
  org: tOrg,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  publishEvent: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: any) => void,
  toggleChecked: () => void,
}
