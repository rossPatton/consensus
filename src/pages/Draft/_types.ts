import * as H from 'history';
import { match } from 'react-router';

export type tStore = {
  meeting: tThunk<tMeetingSingular>,
  group: tThunk<tGroup>,
  isLoading: boolean,
  roles: tThunk<ts.roleMap[]>,
  session: tThunk<ts.session>
}

export type tComponentProps = {
  meeting: tMeeting,
};

export type tContainerProps = {
  eventThunk: tThunk<tMeetingSingular>,
  getRolesDispatch: () => tThunkPayload<ts.roleMap>,
  isLoading: boolean,
  location: H.Location,
  match: match & { params: tMeetingParams },
  groupThunk: tThunk<tGroup>,
  rolesThunk: tThunk<ts.roleMap[]>,
  session: ts.session,
}

