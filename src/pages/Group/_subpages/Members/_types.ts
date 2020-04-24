import {match} from 'react-router';

export type tStore = {
  usersByGroupId: tThunk<tUser[]>,
};

type tProps = {
  group: tGroup,
  role: tRole,
};

export type tContainerProps = tProps & {
  match: match & {params: tGroupRouteParams},
  usersThunk: tThunk<tUser[]>,
};

export type tComponentProps = tProps & {
  section: string,
};
