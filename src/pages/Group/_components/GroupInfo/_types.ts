import {match} from 'react-router';

export type tProps = {
  match: match & {params: tGroupRouteParams},
  group: tGroup,
  params: tGroupRouteParams,
  role: tRole,
};

export type tComponentProps = tProps & {
  members: tUser[],
};

export type tContainerProps = tProps & {
  getUsersByGroupIdDispatch: (query: tUsersByGroupIdQuery) => tThunkPayload<tUser[]>,
  isLoading: boolean,
  usersByGroupId: tUser[],
};

export type tStore = {
  usersByGroupId: tThunk<tUser[]>,
};
