import {History, Location} from 'history';

export type tStore = {
  session: tThunk<ts.session>,
};

export type tProps = {
  history: History,
  location: Location,
  match: ts.adminSectionParams,
  sessionThunk: tThunk<ts.session>,
};
