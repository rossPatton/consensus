import {tAdminSections} from '../../../_types';

export type tProps = {
  match: tAdminSections,
};

export type tComponentProps = tProps
  & tPublishedFilterProps
  & tSearchFilterProps
  & {
    drafts: tMeeting[],
  meetings: tMeeting[],
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: tThunk<tMeeting[]>,
  getMeetingsByGroupIdDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeeting[]>,
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  session: tThunk<tSession>,
};
