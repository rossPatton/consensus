import {match} from 'react-router';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  role: tRole,
  users: tUser[],
};

export type tRoleOpts = {
  role: tRole,
  orgId: number,
  userId: number,
};

export type tProps = {
  deleteUserByOrg: (query: {orgId: number, userId: number}) => void,
  match: match,
  org: tOrg,
  updateRole: (opts: tRoleOpts) => void,
  usersByOrg: tUsersByOrg,
};

export type tComponentProps = {
  deleteUserByOrg: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  setRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
};
