import {Location} from 'history';


export type tProps = {
  location: Location,
  match: ts.match & { params: { type: 'newUser' | 'newGroup', } },
  session: ts.session,
};

export type tStore = {
  session: ts.thunk<ts.session>,
};
