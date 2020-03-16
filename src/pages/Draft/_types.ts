import * as H from 'history';
import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  org: tThunk<tOrg>,
  isLoading: boolean,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>
}

export type tComponentProps = {
  event: tEvent,
};

export type tContainerProps = {
  eventThunk: tThunk<tEvent>,
  getRolesDispatch: () => tThunkPayload<tRoleMap>,
  isLoading: boolean,
  location: H.Location,
  match: match & { params: tEventParams },
  orgThunk: tThunk<tOrg>,
  rolesThunk: tThunk<tRoleMap[]>,
  session: tSession,
}

