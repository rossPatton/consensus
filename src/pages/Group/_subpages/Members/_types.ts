import {match} from 'react-router';

export type tStore = {
  usersByGroupId: tThunk<tUser[]>,
};

type tProps = {
  group: tGroup,
  role: ts.role,
};

export type tContainerProps = tProps & {
  match: match & {params: tGroupRouteParams},
  usersThunk: tThunk<tUser[]>,
};

export type tComponentProps = tProps & {
  section: string,
};
