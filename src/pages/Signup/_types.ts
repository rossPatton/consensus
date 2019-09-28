import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & { params: { type: 'newUser' | 'newOrg', } },
  session: tSession,
};

export type tStore = {
  session: tThunk<tSession>,
};
