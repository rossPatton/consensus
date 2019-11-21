import {match} from 'react-router';

type tMatch = match & {
  params: {
    page?: string,
    [key: string]: string,
  }
};

export type tState = {
  role: tRole,
};

export type tRoleOpts = {
  role: tRole,
  orgId: number,
  userId: number,
};

type tProps = {
  deleteUserByOrg?: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole?: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
}

export interface tContainerProps extends tProps {
  match: tMatch,
  // role: tRole,
  // session: tSession,
}

export interface tComponentProps extends tProps {
  isEditable: boolean,
}
