import {match} from 'react-router-dom';

export type tProps = {
  orgs: tOrg[],
};

export type tComponentProps = tProps & {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  deleteOrgByUser: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
};

export type tContainerProps = tProps & {
  match: match,
  // from redux
  deleteOrgByUser: (query: {orgId: number, userId: number}) => void,
  getOrgsByUser: () => void,
  session: tSession,
};

export type tState = {
  orgs: tOrg[],
};

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
