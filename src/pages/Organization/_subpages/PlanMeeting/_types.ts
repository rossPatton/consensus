import {Location} from 'history';

export type tState = Partial<tEvent> & {
  duration: string | number,
  time: string,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  events: tEvent[],
  org: tOrg,
  postEvent: (query: tUpsertEventQuery) => tThunkPayload<tEvent>,
  router: Location,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  saveAsDraft: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  updateState: (stateKey: tStateUnion, value: any) => void,
};
