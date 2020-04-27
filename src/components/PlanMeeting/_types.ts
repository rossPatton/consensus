import {Location} from 'history';

export type tState = Partial<tMeeting> & {
  duration: string | number,
  isCopy: boolean,
  time: string,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  session: tThunk<ts.session>,
};

export type tKeyUnion = keyof tState;
export type tValueUnion = ValueOf<tState>;
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  meetings: tMeeting[],
  heading?: string,
  group: tGroup,
  patchEventDispatch: (query: tUpsertMeetingQuery) => tThunkPayload<tMeetingSingular>,
  postMeetingDispatch: (query: tUpsertMeetingQuery) => tThunkPayload<tMeetingSingular>,
  router: Location,
  sessionThunk: tThunk<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  onSubmit: () => void,
  saveAsDraft: () => void,
  updateState: (stateKey: tKeyUnion, value: tValueUnion) => void,
};
