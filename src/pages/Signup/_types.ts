import {History, Location} from 'history';

export type tProps = {
  history: History,
  location: Location,
  match: ts.match & { params: { type: 'newUser' | 'newGroup', } },
  session: ts.session,
  sessionType: 'group' | 'user',
};

export type tStore = {
  session: ts.thunk<ts.session>,
};
