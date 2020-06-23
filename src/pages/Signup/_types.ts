import {History, Location} from 'history';

export type tProps = {
  history: History,
  location: Location,
  match: ts.match & { params: { type: 'user' | 'group', } },
  sessionType: 'group' | 'user',
};

export type tContainerProps = tProps & {
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tProps & {
  termsAccepted: boolean,
  toggleTerms: (termsAccepted: boolean) => void,
}

export type tStore = {
  session: ts.thunk<ts.session>,
};
