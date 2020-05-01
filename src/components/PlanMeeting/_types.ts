import {Location} from 'history';
import {ValuesType} from 'utility-types';

export type tState = Partial<ts.meeting> & {
  endTime: string,
  isCopy: boolean,
  isOnline: boolean,
  time: string,
};

export type tStore = {
  meeting: ts.thunk<ts.meeting>,
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
};

export type tKeyUnion = keyof tState;
export type tValueUnion = ValuesType<tState>;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  meetingThunk: ts.thunk<ts.meeting>,
  meetingsThunk: ts.thunk<ts.meeting[]>,
  heading?: string,
  group: ts.group,
  patchEventDispatch:
    (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  postMeetingDispatch:
    (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  router: Location,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: () => void,
  saveAsDraft: () => void,
  updateState: (stateKey: tKeyUnion, value: tValueUnion) => void,
};
