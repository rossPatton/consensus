import {Location} from 'history';

export type tState = Partial<tEvent> & {
  duration: string | number,
  isCopy: boolean,
  time: string,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tKeyUnion = keyof tState;
export type tValueUnion = ValueOf<tState>;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  events: tEvent[],
  org: tOrg,
  patchEventDispatch: (query: tUpsertEventQuery) => tThunkPayload<tEvent>,
  postEventDispatch: (query: tUpsertEventQuery) => tThunkPayload<tEvent>,
  router: Location,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: () => void,
  saveAsDraft: () => void,
  updateState: (stateKey: tKeyUnion, value: tValueUnion) => void,
};
