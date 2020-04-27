import {Location} from 'history';
import {ValuesType} from 'utility-types';

export type tState = Partial<ts.meeting> & {
  duration: string | number,
  isCopy: boolean,
  time: string,
};

export type tStore = {
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};

export type tKeyUnion = keyof tState;
export type tValueUnion = ValuesType<tState>;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  meetings: ts.meeting[],
  heading?: string,
  group: ts.group,
  patchEventDispatch: (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  postMeetingDispatch: (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  router: Location,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: () => void,
  saveAsDraft: () => void,
  updateState: (stateKey: tKeyUnion, value: tValueUnion) => void,
};
