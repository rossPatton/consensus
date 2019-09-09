import {match} from 'react-router';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  users: tUser[],
}

export type tProps = {
  match: match,
  usersByOrg: tUsersByOrg,
};

export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  users: tUser[],
  userTotal: number,
};
