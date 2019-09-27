import {match} from 'react-router';

export type tProps = {
  match: match & { params: { type: 'newUser' | 'newOrg', } },
  session: tSession,
};

export type tStore = {
  session: tThunk<tSession>,
};
