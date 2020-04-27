import * as H from 'history';
import { match } from 'react-router';

export type tStore = {
  meeting: tThunk<tMeetingSingular>,
  meetingsByGroupId: tThunk<tMeeting[]>,
  group: tThunk<tGroup>,
  isLoading: boolean,
  roles: tThunk<ts.roleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<ts.session>
}

export type tProps = {
  meetingsByGroupId: tMeeting[],
};

export type tComponentProps = tProps & {
  meeting: tMeetingSingular,
  isDesktop: boolean,
  isMobile: boolean,
  group: tGroup,
  rsvp: tRSVP,
};

export type tContainerProps = tProps & {
  eventThunk: tThunk<tMeetingSingular>,
  getMeetingDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeetingSingular>,
  getMeetingsByGroupIdDispatch: (query: tGetMeetingQuery) => tThunkPayload<tMeeting[]>,
  getGroupByIdDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  getRolesDispatch: () => tThunkPayload<ts.roleMap>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  location: H.Location,
  match: match & { params: tMeetingParams },
  groupThunk: tThunk<tGroup>,
  rolesThunk: tThunk<ts.roleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: ts.session,
}

