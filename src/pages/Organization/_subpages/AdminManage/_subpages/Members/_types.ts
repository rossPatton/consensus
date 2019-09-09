import {match} from 'react-router';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  users: tUser[],
}

export type tProps = {
  deleteUserByOrg: (query: {orgId: number, userId: number}) => void,
  match: match,
  org: tOrg,
  usersByOrg: tUsersByOrg,
};

export type tComponentProps = {
  deleteUserByOrg: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  users: tUser[],
  userTotal: number,
};
