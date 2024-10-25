import {Location} from 'history';
import {ValuesType} from 'utility-types';

export type tState = Partial<ts.meeting> & {
  endTime?: string,
  error?: string | ts.fetchResponse<Error>,
  isCopy?: boolean,
  isOnline?: boolean,
  time?: string,
};

export type tStore = {
  meeting: ts.thunk<ts.meeting>,
  meetingsByGroupId: ts.thunk<ts.meeting[]>,
  session: ts.thunk<ts.session>,
  uploads: ts.thunk<ts.upload>,
};

export type tKeyUnion = keyof tState;
export type tValueUnion = ValuesType<tState>;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tProps = {
  img: string | null,
  meetingThunk: ts.thunk<ts.meeting>,
  heading?: string,
  group: ts.group,
};

export type tContainerProps = tProps & {
  meetingsThunk: ts.thunk<ts.meeting[]>,
  getMeetingDispatch: (query: ts.getMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  patchMeetingDispatch:
    (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  postMeetingDispatch:
    (query: ts.upsertMeetingQuery) => ts.thunkPayload<ts.meetingSingular>,
  router: Location,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tProps & tState & {
  onSubmit: () => void,
  saveAsDraft: () => void,
  updateState: (stateKey: tKeyUnion, value: tValueUnion) => void,
};
