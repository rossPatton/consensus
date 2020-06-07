import {History, Location} from 'history';

export type tProps = {
  history: History,
  location: Location,
  match: ts.match & { params: { type: 'user' | 'group', } },
  session: ts.session,
  sessionType: 'group' | 'user',
  termsAccepted: boolean,
  toggleTerms: (termsAccepted: boolean) => void,
};

export type tStore = {
  session: ts.thunk<ts.session>,
};
