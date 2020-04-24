import * as H from 'history';
import { match } from 'react-router';

export type tStore = {
  meeting: tThunk<tMeetingSingular>,
  group: tThunk<tGroup>,
  isLoading: boolean,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>
}

export type tComponentProps = {
  meeting: tMeeting,
};

export type tContainerProps = {
  eventThunk: tThunk<tMeetingSingular>,
  getRolesDispatch: () => tThunkPayload<tRoleMap>,
  isLoading: boolean,
  location: H.Location,
  match: match & { params: tMeetingParams },
  groupThunk: tThunk<tGroup>,
  rolesThunk: tThunk<tRoleMap[]>,
  session: tSession,
}

