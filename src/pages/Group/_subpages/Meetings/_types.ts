import {match} from 'react-router';

type tProps = {
  group: tGroup,
  role: tRole,
};

export type tComponentProps = tSearchFilterProps & tProps & {
  meetings: tMeeting[],
  hideMeetings: boolean,
  originalEvents: tMeeting[],
  type: 'drafts' | 'meetings',
};

export type tContainerProps = tProps & {
  meetingsByGroupIdThunk: tThunk<tMeeting[]>,
  isLoading: boolean,
  match: match & {params: tGroupRouteParams},
  session: tSession<tUser | tGroup>,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  session: tThunk<tSession<tUser | tGroup>>,
};
