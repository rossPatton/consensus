export type tProps = {
  createEvent: (event: any) => Promise<any>,
  org: tOrg,
  session: tSession,
};

export type tState = {
  category: string,
  date: string,
  description: string,
  endDate: string,
  isPrivate: boolean,
  location: string,
  time: string,
  title: string,
};

export type tStateUnion = keyof tState;

export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tComponentProps = tProps & tState & {
  publishEvent: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: any) => void,
  toggleChecked: () => void,
}
