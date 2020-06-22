import {History, Location} from 'history';

export type tProps = {
  history: History,
  location: Location,
  match: ts.adminSectionParams,
  session: ts.session<ts.group>,
};
