import {match} from 'react-router';

type tProps = {
  group: tGroup,
  role: ts.role,
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
  session: ts.session<tUser | tGroup>,
};

export type tStore = {
  meetingsByGroupId: tThunk<tMeeting[]>,
  session: tThunk<ts.session<tUser | tGroup>>,
};
