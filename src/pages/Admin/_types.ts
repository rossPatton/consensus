import {History, Location} from 'history';

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tProps = {
  history: History,
  location: Location,
  match: ts.adminSectionParams,
  sessionThunk: ts.thunk<ts.session>,
};
