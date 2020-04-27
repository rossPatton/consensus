import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & { params: { type: 'newUser' | 'newOrg', } },
  session: ts.session,
};

export type tStore = {
  session: tThunk<ts.session>,
};
