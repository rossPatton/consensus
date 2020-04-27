import {Location} from 'history';

export type tProps = {
  location: Location,
  match: ts.adminSectionParams,
  session: ts.session<tGroup>,
};
